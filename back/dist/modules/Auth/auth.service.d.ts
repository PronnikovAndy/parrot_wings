import { UserService } from "../User/user.service";
import { JwtService } from "@nestjs/jwt";
import { SigninDto, SignupDto } from "./dto/auth.dto";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(signinDto: SigninDto): Promise<any>;
    signin(signinDto: SigninDto): Promise<{
        access_token: string;
    }>;
    signup(signupDto: SignupDto): Promise<"User already exists" | {
        id: number;
        fullName: string;
        email: string;
    }>;
}
