import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Throttle({ default: { limit: 3, ttl: 60000}})
  @Get('sih')
  callMyName(): string {
    return 'welcome to start inovation hub';
  }

  @Post('upload')
@UseInterceptors(FileInterceptor('joe'))
uploadFile(@UploadedFile(

  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 500000 }),
      new FileTypeValidator({ fileType: 'image/jpeg' }),
    ],
  }),

) file: Express.Multer.File) {
  console.log(file);
}

}
