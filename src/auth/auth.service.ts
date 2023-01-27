import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async googleLoginRedirect(user, res: Response) {
    const userExist = await this.prisma.user.findFirst({
      where: {
        googleId: user.id,
      },
    });
    if (userExist) {
      const token = sign({ user: userExist }, process.env.JWT_SECRET, {
        expiresIn: '5d',
      });
     return res.cookie('NestJsBlog', token).redirect(process.env.APP_URL);
    } else {
      const data = await this.prisma.user.create({
        data: {
          googleId: user.id,
          name: user.name,
          avatarImg: user.picture,
          role:'user'
        },
      });
      const token = sign({ user: data }, process.env.JWT_SECRET, {
        expiresIn: '5d',
      });
     return res.cookie('NestJsBlog', token).redirect(process.env.APP_URL);
    }
  }
  async facebookLoginRedirect(user, res: Response) {
    const userExist = await this.prisma.user.findFirst({
        where: {
          facebookId: user.id,
        },
      });
      if(userExist){
        const token = sign({ user: userExist }, process.env.JWT_SECRET, {
            expiresIn: '5d',
          });
        return  res.cookie('NestJsBlog', token).redirect(process.env.APP_URL);
      }else {
        const data = await this.prisma.user.create({
            data: {
              facebookId: user.id,
              name: user.name,
              avatarImg: user.picture,
              role:'user'
            },
          });
          const token = sign({ user: data }, process.env.JWT_SECRET, {
            expiresIn: '5d',
          });
          return  res.cookie('NestJsBlog', token).redirect(process.env.APP_URL);
      }
 
  }
}
