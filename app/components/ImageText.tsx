'use client'
import React, { useState } from 'react';
import axios from 'axios';

const ImageText = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };
  
  // Function to handle file upload
  const handleUpload = () => {
    console.log(selectedFile)
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('/api/image', formData)
      .then(response => {
        // Handle success
        console.log('File uploaded successfully:', response.data);
        setSelectedFile(null); // Clear selected file after upload
      })
      .catch(error => {
        // Handle error
        console.error('Error uploading file:', error);
      });
  };

  return (
    <section className='borders h-screen w-full'>
      <input type="file" name="" id="" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </section>
  );
};

export default ImageText;
