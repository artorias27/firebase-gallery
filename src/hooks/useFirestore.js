import { useState, useEffect } from 'react';
import { projectFireStore } from '../firebase/config';

const useFirestore = collection_name => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        const unsub = projectFireStore.collection(collection_name)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    let data = doc.data(); // data stored in firestore collection(database)
                    // console.log(data);
                    const { width, height } = getImgDimensions(data.url);
                    documents.push({ ...data, id: doc.id, width: width, height: height, src: data.url });
                });
                console.log("Photos: ",documents)
                setDocs(documents);
            });
        
            const getImgDimensions = (url) => { // get image width and height from firebase url
                let img = new Image();
                let width, height;
                img.src = url;
                img.onload = () => { // onload fires immediately and will not hold values outside onload
                    width = img.width;
                    height = img.height;
                    return { width, height }
                }  
                return img.onload();  
            }
        return () => unsub();
    }, [collection_name])

    return docs; 
}

export default useFirestore;