import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request, Response } from 'express';
import { RoleGuard } from 'src/guard/role.guard';

import { BlogService } from './blog.service';
import { ImageUpload } from './imageUpload.service';
const imageFileFilter = (req, file: Express.Multer.File, done) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationMessage = 'image should be image format';
    done(null, false);
  }
  done(null, true);
};

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService,private readonly imageUpload:ImageUpload) {}

  // new blog page
  @UseGuards(RoleGuard)
  @Get('/new')
  @Render('new-blog')
  async getNewBlogPage() {}

  //post new blog
  @UseGuards(RoleGuard)
  @Post('/new')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1024 * 1 },
    }),
  )
  async postNewBlog(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
    @Req() req: Request,
  ) {
    return this.blogService.postNewBlog(file, body, req);
  }
  //get single blog page
  @Get('/:id')
  @Render('blog')
  getSingleBlog(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.getSingleBlog(id);
  }
  //comment

  // only for image upload
  @UseGuards(RoleGuard)
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1024 * 1 },
    }),
  )
  async uploadImage(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imageUpload.uploadImage(file, req);
  }
}
