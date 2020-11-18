import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TransactionDto } from "./dto/transaction.dto";
import { UserService } from "../User/user.service";
export declare class TransactionService {
    private transactionRepository;
    private userService;
    constructor(transactionRepository: Repository<Transaction>, userService: UserService);
    create(transactionData: TransactionDto): Promise<Transaction | string>;
    findAllUserTransaction(id: string, sort?: {
        field: string;
        order: 'ASC' | 'DESC';
    }, filter?: {
        field: string;
        value: any;
    }): Promise<Transaction[]>;
    findOne(id: string): Promise<Transaction>;
}
