import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { PrismaService } from "src/prisma/prisma.service";

export class AuthMiddleware implements NestMiddleware {
    constructor(private prisma :PrismaService){}
    async use(req: Request, res: Response, next: (error?: any) => void) {
        const token = req.cookies.NestJsBlog
        if(!token){
           if(res.locals.html){
            return res.redirect(`${process.env.APP_URL}/auth`)
           }else {
            return res.status(403).json({message:'login first',login:false})
           }
        }
        jwt.verify(token,process.env.JWT_SECRET, async (err,decoded)=> {
            if(err){
                if(res.locals.html){
                    return res.redirect(`${process.env.APP_URL}/auth`)
                }else {
                    return res.status(403).json({message:'login first',login:false})
                   }
            }
            res.locals.myInfo = decoded.user
            res.locals.role = decoded.user.role === 'admin' ? true : false
            req.user = decoded.user
            next()
        })
    }
    
}