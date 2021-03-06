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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(signupDto) {
        try {
            const user = new user_entity_1.User();
            user.email = signupDto.email;
            user.fullName = signupDto.fullName;
            user.password = signupDto.password;
            user.balance = 500;
            return this.userRepository.save(user);
        }
        catch (error) {
            console.log('error', error.message);
            throw new common_1.HttpException(error.message, 400);
        }
    }
    findAll(id) {
        try {
            return this.userRepository.find({
                where: { id: typeorm_2.Not(id) }
            });
        }
        catch (error) {
            console.log('error', error.message);
            throw new common_1.HttpException(error.message, 400);
        }
    }
    findOneByEmail(email) {
        try {
            return this.userRepository.findOne({ email });
        }
        catch (error) {
            console.log('error', error.message);
            throw new common_1.HttpException(error.message, 400);
        }
    }
    findOne(id) {
        try {
            return this.userRepository.findOne(id);
        }
        catch (error) {
            console.log('error', error.message);
            throw new common_1.HttpException(error.message, 400);
        }
    }
    async changeBalance(amount, userId, type) {
        try {
            const user = await this.userRepository.findOne(userId);
            user.balance = type === 'credit' ? user.balance + amount : user.balance - amount;
            return await this.userRepository.save(user);
        }
        catch (error) {
            console.log('error', error.message);
            throw new common_1.HttpException(error.message, 400);
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map