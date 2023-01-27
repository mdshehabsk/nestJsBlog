import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";


export class CommentDelete implements CanActivate{
    constructor(private prisma: PrismaService){}
    async canActivate(context: ExecutionContext):  Promise<any>  {
      const req = context.switchToHttp().getRequest<Request>() 
      const {blogid,commentid} = req.params
      const singlecomment = await this.prisma.comment.findUnique({
        where:{
            id:Number(commentid)
        }
      })
      console.log(req.params)
      return true
    }
}