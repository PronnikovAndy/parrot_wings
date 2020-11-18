import { UserService } from "./user.service";
import { User } from "./user.entity";
import { Transaction } from "../Transaction/transaction.entity";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): Promise<User[]>;
    getAllTransaction(req: any): Promise<Transaction[]>;
}
