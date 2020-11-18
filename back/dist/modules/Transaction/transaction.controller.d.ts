import { Transaction } from "./transaction.entity";
import { TransactionService } from "./transaction.service";
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TransactionService);
    create(req: any): Promise<any>;
    getAll(req: any): Promise<Transaction[]>;
}
