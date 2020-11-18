import { SigninDto, SignupDto } from './dto/auth.dto';
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(signinDto: SigninDto): Promise<{
        access_token: string;
    }>;
    signup(signupDto: SignupDto): Promise<"User already exists" | {
        id: number;
        fullName: string;
        email: string;
    }>;
}
