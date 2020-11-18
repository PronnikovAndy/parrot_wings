import { Transaction } from "../Transaction/transaction.entity";
export declare class User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    balance: number;
    transactions: Transaction[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
