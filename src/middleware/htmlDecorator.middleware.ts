import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";


export class HtmlDecoratorMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: (error?: any) => void) {
        res.locals.html = true
        next()
    }
}