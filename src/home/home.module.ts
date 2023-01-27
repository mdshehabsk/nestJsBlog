import { Module } from '@nestjs/common';
import { ImageUpload } from 'src/blog/imageUpload.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  controllers: [HomeController],
  providers: [HomeService,ImageUpload,PrismaService]
})
export class HomeModule {}
