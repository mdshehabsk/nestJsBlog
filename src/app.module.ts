import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './home/home.module';
import { BlogModule } from './blog/blog.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { BlogController } from './blog/blog.controller';
import { HtmlDecoratorMiddleware } from './middleware/htmlDecorator.middleware';
import { HomeController } from './home/home.controller';
import { CommentModule } from './comment/comment.module';
import { CommentController } from './comment/comment.controller';
@Module({
  imports: [
    CommentModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HomeModule,
    BlogModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HtmlDecoratorMiddleware)
      .forRoutes({ path: 'blog/new', method: RequestMethod.GET },{path:'',method:RequestMethod.GET})
      .apply(AuthMiddleware)
      .forRoutes(BlogController,HomeController,CommentController)
      // .forRoutes(
      //   { path: 'blog/new', method: RequestMethod.GET },
      //   { path: 'blog/new', method: RequestMethod.POST },
      //   { path: 'blog/image', method: RequestMethod.POST },
      // );
  }
}
