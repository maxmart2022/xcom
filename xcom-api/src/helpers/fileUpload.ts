import { Request, Response } from "express";
const AWS = require("aws-sdk");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

AWS.config.update({
  accessKeyId: "ACCESS_KEY_ID",
  secretAccessKey: "SECRET_ACCESS_KEY",
});

const s3 = new AWS.S3({
  endpoint: "nyc3.digitaloceanspaces.com",
  signatureVersion: "v4",
  region: "nyc3",
});

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const params = {
      Bucket: "SPACE_NAME",
      Key: file.originalname,
      Body: file.buffer,
      ACL: "public-read",
    };

    const uploaded = await s3.upload(params).promise();
    return res.status(200).send(uploaded);
  } catch (error) {
    return res.status(500).send(error);
  }
};

app.post("/api/upload", upload.single("file"), uploadImage);
