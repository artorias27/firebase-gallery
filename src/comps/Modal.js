import React from 'react'

const Modal = ({ selectedImg, setSelectedImg }) => {
    const handle = e => {
        if(e.target.classList.contains('backdrop')) setSelectedImg(null);
    }
    return (
        <div className="backdrop" onClick={handle}>
            <img src={selectedImg} alt="Enlarge pic" />
        </div>
    )
}

export default Modal;