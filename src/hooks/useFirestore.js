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
                    console.log(doc.data())
                    documents.push({ ...doc.data(), id: doc.id });
                });
                setDocs(documents);
            });
        
        return () => unsub();
    }, [collection_name])

    return docs; 
}

export default useFirestore;