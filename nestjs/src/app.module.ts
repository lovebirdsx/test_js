import { Module } from '@nestjs/common';
import { AppController, CalcController } from './app.controller';
import { AppService, CalcService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, CalcController],
  providers: [AppService, CalcService],
})
export class AppModule {}
