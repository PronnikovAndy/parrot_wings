import { User } from "../User/user.entity";
export declare class Transaction {
    id: string;
    name: string;
    amount: number;
    resultingBalance: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
