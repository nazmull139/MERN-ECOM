{/*import axios from 'axios';
import React, { useState } from 'react';
import { getBaseUrl } from '../../../../utils/baseURL';

const UploadImage = ({name , setImage , id , value , label , placeholder}) => {

const [loading , setLoading] = useState(false);
const [url , setUrl] = useState("");


const convertBase64 = (file) => {

    return new Promise((resolve , reject)=> {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () =>{
          resolve(fileReader.result)
        }
        fileReader.onerror= () => {
                    reject(error)
                }

    })  

};

const uploadSingleImage = async (base64) => {
      // cal api to upload the image on cloudinary
      setLoading(true);
    
        await axios.post(`${getBaseUrl()}/uploadImage`,{image: base64})
        .then((res)=> {
          const imageUrl = res.data;
          setUrl(imageUrl);
          console.log(res.data)

          alert("Uploaded image successfully");
          setImage(imageUrl);
        }).then(()=> setLoading(false)).catch((error)=> {
          console.error("Failed to upload image", error);
          setLoading(false);
          alert("Failed to upload image , please try again")
        })
      

}



const uploadImage = async (event) =>{
  const files = event.target.files;
console.log("files",files);


if(files.length === 1){
    const base64 =  await convertBase64(files[0]);
    uploadSingleImage(base64);
    return;

    }
    const base64s = [];
    for(let i = 0 ; i< files.length; i++){
        const base = await convertBase64(files[i]);
        base64s.push(base)
    }
};

  return (
    <div>
        <label htmlFor={name} className='block text-sm font-medium text-gray-600'>{label}</label>
        <input type="file"
            onChange={uploadImage}
        name={name} id={name} className='add-product-Input-CSS'/>
         {
            loading && (
            <div className='mt-2 text-sm text-blue-600'>
                <p>Uplading...</p>
            </div>)
         }
         {
            url && (
                <div>
                    <p>Image uploaded successfully!</p>
                    <img src={url} alt="uploaded image" />
                </div>
            )
         }


    </div>
  )
}

export default UploadImage*/}

//////// new

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
import { getBaseUrl } from "../../../../utils/baseURL";

const UploadImage = ({ setImages }) => {
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const uploadImages = async (files) => {
    setLoading(true);
    try {
      const base64Images = await Promise.all([...files].map((file) => convertBase64(file)));

      const response = await axios.post(`${getBaseUrl()}/uploadImage`, {
        images: base64Images,
      });

      setUrls(response.data.urls);
      setImages(response.data.urls);
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload images", error);
      alert("Failed to upload images, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;

    if (files.length === 0 || urls.length + files.length > 4) {
      alert("You can upload up to 4 images.");
      return;
    }

    uploadImages(files);
  };

  const removeImage = (index) => {
    const updatedUrls = urls.filter((_, i) => i !== index);
    setUrls(updatedUrls);
    setImages(updatedUrls);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length === 0 || urls.length + files.length > 4) {
      alert("You can upload up to 4 images.");
      return;
    }
    uploadImages(files);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white">
      <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
        Upload Images (Max 4)
      </label>

      {/* Drag & Drop Zone */}
      <div
        className="border-2 border-dashed border-gray-400 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="images" />
        <label htmlFor="images" className="cursor-pointer">
          Drag & Drop or Click to Upload
        </label>
      </div>

      {loading && <p className="mt-2 text-sm text-blue-600">Uploading...</p>}

      {urls.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {urls.map((url, index) => (
            <div key={index} className="relative group">
              {/* Open Image in Dialog */}
              <Dialog>
                <DialogTrigger>
                  <img
                    src={url}
                    alt={`uploaded-${index}`}
                    className="w-full h-32 object-cover rounded-md cursor-pointer"
                  />
                </DialogTrigger>
                <DialogContent>
                  <img src={url} alt="Preview" className="w-full h-auto rounded-lg" />
                </DialogContent>
              </Dialog>

              {/* Remove Image Button */}
              <button
                className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100"
                onClick={() => removeImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
