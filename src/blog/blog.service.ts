import { BadRequestException, Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { format } from 'date-fns';
import { ImageUpload } from './imageUpload.service';
@Injectable()
export class BlogService {
  constructor(private imageUpload:ImageUpload,private readonly prisma: PrismaService,) {}
 
  async postNewBlog(
    file: Express.Multer.File,
    body: { title: string; content: string },
    req: Request,
  ) {
    const user: any = req.user;
    const { title, content } = body;
    if (!file) {
      throw new BadRequestException('image missing');
    }
    if (!title) {
      throw new BadRequestException('title missing');
    }
    if (title.length > 100) {
      throw new BadRequestException('title should be smaller then 100');
    }
    if (!content) {
      throw new BadRequestException('content missing');
    }
    const imageUpload: any = await this.imageUpload.uploadImage(file, req, 'blog/title');
    const date = new Date();
    const formattedDate = format(date, 'd MMMM yyyy');
    await this.prisma.post.create({
      data: {
        title,
        description: content,
        image: imageUpload.imageURL,
        date: formattedDate,
        authorId: user.id,
      },
    });
    return {
      message:'publish successfull',
      success:true
    }
  }
  async getSingleBlog (id:number){
    const singleBlog = await this.prisma.post.findUnique({
      where:{
        id
      },
      select:{
        id:true,
        title:true,
        description:true,
        image:true,
        date:true,
        author:{
            select:{
                id:true,
                name:true,
                avatarImg:true,
                bio:true
            }
        }
    },  
    })
    return {
      singleBlog
    }
  }

}
