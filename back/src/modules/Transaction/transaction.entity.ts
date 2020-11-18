
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToMany, JoinTable
} from 'typeorm';
import {User} from "../User/user.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amount: number;

    @ManyToMany(() => User, user => user.transactions, {
        cascade: true
    })
    @JoinTable()
    users: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}