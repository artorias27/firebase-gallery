import { useState, useEffect } from 'react';
import { projectStorage, projectFireStore, timestamp } from '../firebase/config';

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null); // will get back from storage

    useEffect(() => {
        const storageRef = projectStorage.ref(file.name);      
        const collectionRef = projectFireStore.collection('Wallpapers');
        
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async() => {
            const url = await storageRef.getDownloadURL();
            const imgObj = await getImgDimensons(url);    // get image's metadata
            let width = imgObj.width;
            let height = imgObj.height;
            const createdAt = timestamp();
            const name = file.name;
            collectionRef.add({ url, createdAt, name, width, height });
            setUrl(url);
        });

        const getImgDimensons = (url) => {
            return new Promise((resolve, reject) => {
                let img = new Image();
                img.onload = () => resolve(img);     // onload fires immediately and will not hold values outside onload
                img.onerror = () => reject("Metadata cannot be loaded!");
                img.src = url;
            })
        }
    }, [file]);

    return { progress, url, error };
}

export default useStorage;