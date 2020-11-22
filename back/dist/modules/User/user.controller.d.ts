import { UserService } from "./user.service";
import { User } from "./user.entity";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(req: any): Promise<User[]>;
    getProfile(req: any): Promise<{
        fullName: string;
        balance: number;
    }>;
}
