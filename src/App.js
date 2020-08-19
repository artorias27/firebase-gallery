import React, { useState, useCallback } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import useFirestore from './hooks/useFirestore';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

function App() {
  const [selectedImg, setSelectedImg ] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const photos = useFirestore("Wallpapers").map( ({ src, width, height, name }) => ({ src, width, height, name }) )
  console.log(photos);

  const openLightBox = useCallback((e, { photo, index }) => {
    setViewerIsOpen(true);
    setCurrentImg(index);
  });

  const closeLightBox = () => {
    setCurrentImg(0);
    setViewerIsOpen(false);
  }

  const modal = viewerIsOpen ? ( // modal open?
    <Modal onClose={closeLightBox}>
      <Carousel 
        currentIndex={currentImg}
        views={photos.map( x => ({ ...x, caption: x.name }) )}
      />
    </Modal>
  ) : null;

  return (
    <div className="App">
      <Title/>
      <UploadForm />
      <Gallery photos={photos} onClick={openLightBox} />
      <ModalGateway>
        { modal }
      </ModalGateway>
    </div>
  );
}

export default App;
