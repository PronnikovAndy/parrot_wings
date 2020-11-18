
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import {TransactionDto} from "./dto/transaction.dto";
import {UserService} from "../User/user.service";

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        private userService: UserService
    ) {}

    async create(transactionData: TransactionDto): Promise<Transaction | string> {
        const transaction = new Transaction();

        const sender = await this.userService.changeBalance(transactionData.amount, transactionData.senderId, 'debit');
        const recipient = await this.userService.changeBalance(transactionData.amount, transactionData.recipientId, 'credit');

        console.log("sender", sender);
        console.log("recipient", recipient);

        if(!sender || !recipient) {
            return 'Invalid user';
        }

        transaction.users = [sender, recipient];
        transaction.amount = transactionData.amount;

        return this.transactionRepository.save(transaction);
    }

    findAllUserTransaction(id: string, sort?: { field: string, order: 'ASC' | 'DESC'}, filter?: { field: string, value: any }): Promise<Transaction[]> {
        const query = this.transactionRepository
            .createQueryBuilder('transaction')
            .leftJoinAndSelect('transaction.users', 'users')
            .where("users.id = :id", { id })
            .orderBy('transaction.createdAt')

        if(sort) {
            query
                .orderBy(`transaction.${sort.field}`, sort.order)
        }

        if(filter) {
            query
                .where(`transaction.${filter.field}`, filter.value)
        }

        return query.getMany();
    }

    findOne(id: string): Promise<Transaction> {
        return this.transactionRepository.findOne(id);
    }
}