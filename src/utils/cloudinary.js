
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  cloud_name: process.env.cloud_name,
  secure: true,
});

export default cloudinary;
