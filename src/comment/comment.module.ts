import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { BlogService } from 'src/blog/blog.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageUpload } from 'src/blog/imageUpload.service';

@Module({
  providers: [CommentService,BlogService,ImageUpload,PrismaService],
  controllers: [CommentController],
})
export class CommentModule {}
