import { UserService } from "./user.service";
import { User } from "./user.entity";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): Promise<User[]>;
}
