import { BadRequestException } from "@nestjs/common";
import * as cloudinary from 'cloudinary'
import { Request } from "express";
export class ImageUpload {
    constructor() {}
  async uploadImage(
    file: Express.Multer.File,
    req: Request,
    path = 'blog/random',
  ) {
    if (!file || req['fileValidationMessage']) {
      throw new BadRequestException(req['fileValidationMessage']);
    }
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          { resource_type: 'image', folder: path },

          (err, image) => {
            if (err) {
              throw new BadRequestException(err);
            } else {
              resolve({
                imageURL: image.url,
              });
            }
          },
        )
        .end(file.buffer);
    });
  }
}