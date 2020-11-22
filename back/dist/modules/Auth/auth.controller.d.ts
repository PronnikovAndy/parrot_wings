import { SigninDto, SignupDto } from './dto/auth.dto';
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(signinDto: SigninDto): Promise<{
        access_token: string;
    }>;
    signup(signupDto: SignupDto): Promise<"User already exists" | {
        id: string;
        fullName: string;
        email: string;
        balance: number;
        transactions: import("../Transaction/transaction.entity").Transaction[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }>;
    logout(): {
        success: boolean;
    };
}
