import { User } from "../User/user.entity";
export declare class Transaction {
    id: string;
    amount: number;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
