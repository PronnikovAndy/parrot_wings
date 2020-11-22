
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
} from 'typeorm';
import {Transaction} from "../Transaction/transaction.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    balance: number;

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}