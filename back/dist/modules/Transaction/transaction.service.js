"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./transaction.entity");
const user_service_1 = require("../User/user.service");
let TransactionService = class TransactionService {
    constructor(transactionRepository, userService) {
        this.transactionRepository = transactionRepository;
        this.userService = userService;
    }
    async create(transactionData) {
        const transaction = new transaction_entity_1.Transaction();
        const sender = await this.userService.changeBalance(transactionData.amount, transactionData.senderId, 'debit');
        const recipient = await this.userService.changeBalance(transactionData.amount, transactionData.recipientId, 'credit');
        console.log("sender", sender);
        console.log("recipient", recipient);
        if (!sender || !recipient) {
            return 'Invalid user';
        }
        transaction.users = [sender, recipient];
        transaction.amount = transactionData.amount;
        return this.transactionRepository.save(transaction);
    }
    findAllUserTransaction(id, sort, filter) {
        const query = this.transactionRepository
            .createQueryBuilder('transaction')
            .leftJoinAndSelect('transaction.users', 'users')
            .where("users.id = :id", { id })
            .orderBy('transaction.createdAt');
        if (sort) {
            query
                .orderBy(`transaction.${sort.field}`, sort.order);
        }
        if (filter) {
            query
                .where(`transaction.${filter.field}`, filter.value);
        }
        return query.getMany();
    }
    findOne(id) {
        return this.transactionRepository.findOne(id);
    }
};
TransactionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map