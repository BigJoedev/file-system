import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from './file/file.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
      ThrottlerModule.forRoot([{
        ttl: 60000,
        limit: 10,
      }]),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }    
  ],
})
export class AppModule {}
