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
                    documents.push({ ...data, id: doc.id, src: data.url });
                });
                console.log("Photos: ",documents)
                setDocs(documents);
            });
        
        return () => unsub();
    }, [collection_name])

    return docs; 
}

export default useFirestore;