import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import {UserModule} from "../User/user.module";
import {AuthService} from "./auth.service";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '60s'}
            })
        })
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})

export class AuthModule {};