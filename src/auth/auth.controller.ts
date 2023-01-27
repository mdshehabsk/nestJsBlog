import { Controller, Get, Post, Redirect, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleUser } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Get('')
    @Render('login')
    async getAuth(@Req() req:Request ){
        
    }
    @Get('google') 
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        
    }
    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleLoginRedirect (@Req() req:Request, @Res({passthrough:true}) res:Response  ) {
        const user = req.user
        return await this.authService.googleLoginRedirect(user,res)
    }
    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    facebookLogin(){

    }
    @Get('facebook/redirect')
    @UseGuards(AuthGuard('facebook'))
    async facebookLoginRedirect(@Req() req:Request, @Res({passthrough:true}) res:Response  ){
        const user = req.user
        return await this.authService.facebookLoginRedirect(user,res);
    }
    @Get('logout')
    logout(@Req() req:Request ,@Res() res:Response  ) {
       return res.clearCookie('NestJsBlog').redirect('/auth')
    }
}
