import {Controller, Get, UseGuards, Request} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {AuthGuard} from "@nestjs/passport";
import {Transaction} from "../Transaction/transaction.entity";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/transaction')
    async getAllTransaction(@Request() req): Promise<Transaction[]> {
        const user = await this.userService.findAllUserTransaction(req.user.id);

        console.log("user", user);

        return user.transactions;
    }
}
