import React, { useState } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import useFirestore from './hooks/useFirestore';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

function App() {
  const [selectedImg, setSelectedImg ] = useState(null);
  const photos = useFirestore("Wallpapers").map( ({ src, width, height }) => ({ src, width, height }) )
  console.log(photos)
  return (
    <div className="App">
      <Title/>
      <UploadForm />
      <Gallery photos={photos} />
      {/* <ModalGateway>
        <Modal>
          <Carousel />
        </Modal>
      </ModalGateway> */}
    </div>
  );
}

export default App;
