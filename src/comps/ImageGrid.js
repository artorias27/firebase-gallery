import React from 'react';
import useFirestore from '../hooks/useFirestore';

const ImageGrid = ({ setSelectedImg }) => {
    const docs = useFirestore('Wallpapers');
    console.log("Images: ",docs)

    docs.forEach(item => {
        let i = new Image();
        i.src = item.url;
        i.onload = () => { console.log(item.name," - width: ",i.width," px and height: ", i.height," px")}
    })
    const getImageDimensions = (url, callback) => {

    }
    

    let imgList = docs ? (
        docs.map(doc => (
            <div className="img-wrap" key={doc.id} onClick={() => setSelectedImg(doc.url)}>
                <img src={doc.url} alt="picture" />
            </div>
        ))
    ) : null;
    return (
        <div className="img-grid">
            { imgList }
        </div>
    )
}

export default ImageGrid;