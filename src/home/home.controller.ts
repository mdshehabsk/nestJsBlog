import { Body, Controller, Get, ParseIntPipe, Patch, Post, Query, Render, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { query, Request } from 'express';
import { HomeService } from './home.service';
const imageFileFilter = (req, file: Express.Multer.File, done) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      req.fileValidationMessage = 'image should be image format';
      done(null, false);
    }
    done(null, true);
  };
@Controller('')

export class HomeController {
    constructor(private readonly homeService:HomeService){

    }
    @Get('')
    @Render('index')
    getHome(@Query('page') pageNo : number ) {
        return this.homeService.homePage(pageNo)
    }
    //profile page
    @Get('/profile')
    @Render('profile')
    getProfile () {
        // console.log('pfile invoked');
    }
    @Post('profile/update')
    @UseInterceptors(FileInterceptor('avatar',{
        fileFilter: imageFileFilter,
        limits: { fileSize: 1024 * 1024 * 1 },
      }))
    async profileUpdate (@UploadedFile() avatar:Express.Multer.File ,@Body() data ,@Req() req:Request ) {
        return  await this.homeService.profileUpdate(avatar,data,req)
    };
}
