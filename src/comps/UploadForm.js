import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
const Compress = require("compress.js");

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/jpeg"];

  const compressor = new Compress();
  // compress image func will return new image
  const compressImg = async (img) => {
    let compressedImg = await compressor.compress([img], {
      size: 2,
      quality: .8,
      maxWidth: 1920,
      maxHeight: 1920,
      resize: true
    });
    let img1 = compressedImg[0];
    let base64str = img1.data;
    let imgExt = img1.ext;
    let blobImg = Compress.convertBase64ToFile(base64str, imgExt); 
    let blob_to_file = new File([blobImg], img1.alt, { type: blobImg.type });
    // console.log("blob: ", typeof(blob_to_file))
    return blob_to_file; 
    // let data_url = "data:image/jpeg;base64,";
    // data_url += base64str
    // console.log(data_url);
    // return data_url;
  }

  const changeHandler = async (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) { 
      let resizedFile = await compressImg(selected);
      setFile(resizedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select JPEG only!");
    }
  }

  return (
    <form>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>

      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
