import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
export class IsLogin implements NestMiddleware {
  async use(req: Request, res: Response, next: (error?: any) => void) {
    const token = req.cookies.NestJsBlog;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (decoded) {
        if (res.locals.html) {
          return res.redirect(`${process.env.APP_URL}`);
        } else {
          return res.status(403).json({ message: 'please logout', login: false });
        }
      }
      res.locals.myInfo = decoded.user;
      res.locals.role = decoded.user.role === 'admin' ? true : false;
      req.user = decoded.user;
      next()
    });
  }
}
