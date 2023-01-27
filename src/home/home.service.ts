import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ImageUpload } from 'src/blog/imageUpload.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomeService {
    constructor(private readonly prisma:PrismaService,private readonly imageUpload:ImageUpload){}

    async homePage () {
        const blog = await this.prisma.post.findMany({
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
                        avatarImg:true
                    }
                }
            },   
        })
        return {blog}
    }
    async profileUpdate (file:Express.Multer.File,data: { name: string; bio: string; },req:Request)  {
        let imageUpload:any
        const name = data.name 
        const bio = data.bio 
        // if(!name) {
        //     throw new BadRequestException('name empty')
        // }
        // if(!bio) {
        //     throw new BadRequestException('bio empty')
        // }
        if(name.length > 15) {
            throw new BadRequestException('name should be less then 15 charectar')
        }
        if(bio.length > 250){
           return new BadRequestException('bio cannot be greater then 250 charectar')
        }
        if(file){
            imageUpload = await this.imageUpload.uploadImage(file, req, 'blog/avatar');
        }

        const id = req.user['id']
        const update =  await this.prisma.user.update({
            where:{
                id
            },
            data:{
                avatarImg: imageUpload && imageUpload.imageURL,
                name: name.length > 0 ? name: undefined,
                bio: bio.length > 0 ? bio : undefined
            }
        })
        return {
            message:'update successfull',
            success:true
        }
    }
}
