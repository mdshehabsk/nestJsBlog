import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
export class userDetails implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
      try {
        const token = req.cookies.NestJsBlog
      const verify:any = jwt.verify(token,process.env.JWT_SECRET)
      if(verify) {
        res.locals.myInfo = verify['user'];
        res.locals.role = verify.user.role === 'admin' ? true : false
        req.user = verify.user
        next()
      };
      } catch (error) {
        next()
      }
  }
}
