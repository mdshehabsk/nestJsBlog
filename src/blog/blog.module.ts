import { Module } from '@nestjs/common';
import { CommentModule } from 'src/comment/comment.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { ImageUpload } from './imageUpload.service';

@Module({
  controllers: [BlogController],
  providers: [ImageUpload,BlogService,PrismaService,],
  exports:[ImageUpload]
})
export class BlogModule {}
