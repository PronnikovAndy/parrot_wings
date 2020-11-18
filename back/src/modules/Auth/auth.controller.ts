import {Request, Body, Controller, Post } from "@nestjs/common";
import * as bcryptjs from 'bcryptjs';
import { SigninDto, SignupDto} from './dto/auth.dto';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    login(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }

    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        const user = this.authService.signup(signupDto);

        return user;
    }
}