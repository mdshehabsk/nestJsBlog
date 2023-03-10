import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as hbs from 'hbs'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname,'..',"node_modules"))
  app.useStaticAssets(join(__dirname,'..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..','views'));
  app.use(cookieParser())
  // app.use(express.json())
  // app.use(express.urlencoded({extended:false}))
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname,'..','views','partials'))
  const PORT = process.env.PORT || 8000

  await app.listen(PORT);
}
bootstrap()
