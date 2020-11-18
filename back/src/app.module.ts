import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthController} from "./modules/Auth/auth.controller";
import {User} from "./modules/User/user.entity";
import {AuthModule} from "./modules/Auth/auth.module";
import {UserModule} from "./modules/User/user.module";

@Module({
  imports: [
      AuthModule,
      UserModule,
      ConfigModule.forRoot({
          envFilePath: '.env.local'
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User],
        synchronize: true
      })
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
