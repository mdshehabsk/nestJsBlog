import { ArgumentMetadata, PipeTransform } from "@nestjs/common";


export class FileValidation implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value)
    }
}