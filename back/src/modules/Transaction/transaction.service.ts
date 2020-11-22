import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Transaction} from './transaction.entity';
import {TransactionDto} from "./dto/transaction.dto";
import {UserService} from "../User/user.service";

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        private userService: UserService
    ) {
    }

    async create(transactionData: TransactionDto): Promise<{ success: boolean } | string> {
        try {
            const sender = await this.userService.changeBalance(transactionData.amount, transactionData.senderId, 'debit');
            const recipient = await this.userService.changeBalance(transactionData.amount, transactionData.recipientId, 'credit');

            if (!sender || !recipient) {
                return 'Invalid user';
            }

            const name = `From ${sender.fullName} to ${recipient.fullName}`;

            const senderTransaction = new Transaction();
            senderTransaction.name = name;
            senderTransaction.amount = -transactionData.amount;
            senderTransaction.user = sender;
            senderTransaction.resultingBalance = sender.balance;

            const recipientTransaction = new Transaction();
            recipientTransaction.name = name;
            recipientTransaction.amount = transactionData.amount;
            recipientTransaction.user = recipient;
            recipientTransaction.resultingBalance = recipient.balance;

            await this.transactionRepository.save([senderTransaction, recipientTransaction]);

            return {
                success: true
            }
        } catch (error) {
            console.log('error', error.message);
            throw new HttpException(error.message, 400);
        }
    }

    async findAllUserTransaction(
        {
            id,
            sort = {field: 'createdAt', order: 'DESC'},
            filter
        }: {
            id: string,
            sort: { field: string, order: 'ASC' | 'DESC' },
            filter?: { field: string, value: any }
        }): Promise<Transaction[]> {
        try {
            const query = this.transactionRepository
                .createQueryBuilder('transaction')
                .leftJoinAndSelect('transaction.user', 'user')
                .where("user.id = :id", {id})
                .orderBy('transaction.createdAt')
                .select([
                    'transaction.id',
                    'transaction.name',
                    'transaction.resultingBalance',
                    'transaction.amount',
                    'transaction.createdAt'
                ]);

            if (sort) {
                query
                    .orderBy(`transaction.${sort.field}`, sort.order)
            }

            if (filter) {
                query
                    .where(`transaction.${filter.field}`, filter.value)
            }

            return await query.getMany();
        } catch (error) {
            console.log('error', error.message);
            throw new HttpException(error.message, 400);
        }
    }
}