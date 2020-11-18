import * as bcryptjs from 'bcryptjs';
import {Injectable} from "@nestjs/common";
import {UserService} from "../User/user.service";
import { JwtService } from "@nestjs/jwt";
import {SigninDto, SignupDto} from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private  jwtService: JwtService
    ) {}

    async validateUser(signinDto: SigninDto): Promise<any> {
        const {password, ...user} = await this.userService.findOneByEmail(signinDto.email);

        if(!user) return 'Invalid credentials';

        const match = await bcryptjs.compare(signinDto.password, password);

        if(!match) return 'Invalid credentials';

        return user;
    }

    async signin(signinDto: SigninDto) {
        const payload = await this.validateUser(signinDto);

        console.log("payload", payload);

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async signup(signupDto: SignupDto) {
        const user = await this.userService.findOneByEmail(signupDto.email);

        if(user) {
            return 'User already exists';
        }

        const passwordHash = await bcryptjs.hash(signupDto.password, 10);

        const {password, ...newUser} = await this.userService.create({
            ...signupDto,
            password: passwordHash
        });

        return newUser;
    }
}
