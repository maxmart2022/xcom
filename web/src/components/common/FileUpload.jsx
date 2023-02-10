import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    let selected = e.target.files[0];
    const types = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError("Invalid file type. Only Pdf and Images are allowed.");
    }
  };

  const handleUpload = () => {
    if (file) {
      // do something with the file, like send it to a server
    } else {
      setError("No file selected.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
    </div>
  );
};

export default FileUpload;
