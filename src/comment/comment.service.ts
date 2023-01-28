import { Injectable, UnauthorizedException } from '@nestjs/common';
import { format } from 'date-fns';
import { BlogService } from 'src/blog/blog.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blogService: BlogService,
  ) {}
  async postComment(comment: string, blogId: number, userId: number) {
    if (!comment) {
      return;
    }
    const date = new Date();
    const formattedDate = format(date, 'd MMMM yyyy');
    await this.prisma.comment.create({
      data: {
        date: formattedDate,
        text: comment,
        authorId: userId,
        postId:blogId,
      },
    });
    return {
      success: true,
      message: 'comment successfull',
    };
  }
  async getAllComment(blogId: number, req: Request) {
    const { singleBlog } = await this.blogService.getSingleBlog(blogId);
    const { comment } = await this.prisma.post.findUnique({
      where: {
        id: blogId,
      },
      select: {
        comment: {
          include: {
            author: {
              select: {
                id: true,
                avatarImg: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const allComment = comment?.map((obj) => {
      if (
        obj.authorId === req.user['id'] ||
        singleBlog.author.id === req.user['id']
      ) {
        return {
          ...obj,
          canDelete: true,
        };
      } else {
        return {
          ...obj,
          canDelete: false,
        };
      }
    });
    return {
      allComment,
    };
  }
  async deleteComment(blogId:number,commentId:number,req:Request){
    const comment = await this.prisma.comment.findUnique({
      where:{
        id:commentId
      },
      include:{
        post:{
          select:{
            authorId:true
          }
        }
      }
    })
    const match = req.user['id'] === comment.authorId || comment.post.authorId === req.user['id']
    if(!match){
      throw new UnauthorizedException()
    }
    const deleteComment = await this.prisma.comment.delete({
      where:{
        id:commentId
      }
    })
    return {
      success:true,
      message:'comment delete'
    }
  }
}
