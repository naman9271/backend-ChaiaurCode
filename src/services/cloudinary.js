import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //uplaod to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, { resource_type: 'auto' });

    //File has uploaded to cloudinary
    console.log(':File has uploaded successfully', response.url);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    //remove the locally saved temp file as the upload operation failed
    return null;
  }
};

// cloudinary.v2.uploader.upload(
//     "",
//     {public_id:dfs},
//     function(error,result){console.log(result)}
// )

export { uploadOnCloudinary };
