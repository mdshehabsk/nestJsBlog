import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { CommentDelete } from 'src/guard/commentDelete.guard';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService:CommentService) {}
    @Post('comment/:blog')
    postComment(
      @Body('comment') comment: string,
      @Param('blog', ParseIntPipe) blogId,
      @Req() req: any,
    ) {
      const userId = req.user['id'];
      return this.commentService.postComment(comment, blogId, userId);
    }
    // get all comment
    @Get('allComment/:post')
    getAllComment(@Param('post', ParseIntPipe) blogId: number , @Req() req:Request    ) {
      return this.commentService.getAllComment(blogId,req)
    }
    // @UseGuards(CommentDelete)
    @Delete('delete/:blogid/:commentid') 
    deleteComment(@Param('blogid',ParseIntPipe) blogId:number,@Param('commentid',ParseIntPipe) commentId:number, @Req() req:Request  ) {
      return this.commentService.deleteComment(blogId,commentId,req)
    }
}
