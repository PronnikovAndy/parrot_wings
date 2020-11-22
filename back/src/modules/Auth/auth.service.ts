import * as bcryptjs from 'bcryptjs';
import {HttpException, Injectable} from "@nestjs/common";
import {UserService} from "../User/user.service";
import {JwtService} from "@nestjs/jwt";
import {SigninDto, SignupDto} from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(signinDto: SigninDto): Promise<any> {
        try {
            const user = await this.userService.findOneByEmail(signinDto.email);

            if (!user) return 'Invalid credentials';

            const {password, ...result} = user;

            const match = await bcryptjs.compare(signinDto.password, password);

            if (!match) return 'Invalid credentials';

            return result;
        } catch (error) {
            console.log('error', error.message);
            throw new HttpException(error.message, 400);
        }
    }

    async signin(signinDto: SigninDto) {
        try {
            const payload = await this.validateUser(signinDto);

            console.log("payload", payload);

            return {
                access_token: this.jwtService.sign(payload)
            }
        } catch (error) {
            console.log('error', error.message);
            throw new HttpException(error.message, 400);
        }

    }

    async signup(signupDto: SignupDto) {
        try {
            const user = await this.userService.findOneByEmail(signupDto.email);

            if (user) {
                return 'User already exists';
            }

            const passwordHash = await bcryptjs.hash(signupDto.password, 10);

            const {password, ...newUser} = await this.userService.create({
                ...signupDto,
                password: passwordHash
            });

            return newUser;
        } catch (error) {
            console.log('error', error.message);
            throw new HttpException(error.message, 400);
        }

    }
}
