import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  CLOUD_name: process.env.CLOUD_NAME,
  API_key: process.env.API_KEY,
  API_secret: process.env.API_SECRET,
});
export default cloudinary;