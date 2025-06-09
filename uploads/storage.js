// uploads/storage.js
import { Storage } from "@google-cloud/storage";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();



const storage = new Storage({
  keyFilename: "./uploads/gcp-key.json", // path ke key GCP-mu
  projectId: process.env.GCP_PROJECT_ID,
});

const bucketName = process.env.GCS_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

export const uploadImageToGCS = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file uploaded");
    }

    const ext = path.extname(file.originalname);
    const gcsFileName = `produkThrifting/foto-produk/${uuidv4()}${ext}`;
    const blob = bucket.file(gcsFileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.on("finish", async () => {
      try {
        // Buat file bisa diakses publik
        //await blob.makePublic();

        // Dapatkan URL publik
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
        console.log("url imgage di storage: ", publicUrl);
      } catch (err) {
        reject("Failed to make file public.");
      }
    });

    blobStream.end(file.buffer);
  });
};