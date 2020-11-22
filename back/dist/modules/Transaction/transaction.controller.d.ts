import { TransactionService } from "./transaction.service";
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TransactionService);
    create(req: any): Promise<any>;
    getUserTransactions(req: any): Promise<any>;
}
