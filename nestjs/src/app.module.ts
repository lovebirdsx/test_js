import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController, CalcController } from './feature/app/app.controller';
import { AppService, CalcService } from './feature/app/app.service';
import { MongoDbController } from './feature/mongodb/mongodb.controller';
import { MongoDbService } from './feature/mongodb/mongodb.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nestjs')],
  controllers: [AppController, CalcController, MongoDbController],
  providers: [AppService, CalcService, MongoDbService],
})
export class AppModule {}
