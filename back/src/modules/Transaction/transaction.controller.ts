import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {Transaction} from "./transaction.entity";
import {TransactionDto} from "./dto/transaction.dto";
import {TransactionService} from "./transaction.service";

@Controller('transaction')
export class TransactionController {
    constructor(
        private transactionService: TransactionService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Request() req): Promise<any> {
        return await this.transactionService.create({
            senderId: req.user.id,
            recipientId: req.body.recipientId,
            amount: req.body.amount
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll(@Request() req): Promise<Transaction[]> {
        return await this.transactionService.findAllUserTransaction(req.user.id);
    }
}
