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
    async getAll(@Request() req): Promise<User[]> {
        return await this.userService.findAll(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Request() req): Promise<{ fullName: string, balance: number }> {
        const { fullName, balance } = await this.userService.findOne(req.user.id);

        return {
            fullName,
            balance
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('transaction')
    async getTransactions(@Request() req): Promise<Transaction[]> {
        const user = await this.userService.findAllUserTransaction(req.user.id);

        console.log('user', user);

        return user.transactions || [];
    }
}
