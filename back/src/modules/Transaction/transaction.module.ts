import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from "./transaction.controller";
import { TransactionService } from './transaction.service';
import { Transaction } from "./transaction.entity";
import {UserService} from "../User/user.service";
import {User} from "../User/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), TypeOrmModule.forFeature([User])],
    providers: [TransactionService, UserService],
    controllers: [TransactionController]
})

export class TransactionModule {};