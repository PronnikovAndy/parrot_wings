import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {SignupDto} from "../Auth/dto/auth.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
    }

    create(signupDto: SignupDto): Promise<User> {
        const user = new User();
        user.email = signupDto.email;
        user.fullName = signupDto.fullName;
        user.password = signupDto.password;
        user.balance = 500;

        return this.userRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({email});
    }

    findOne(id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }

    findAllUserTransaction(id: string, sort?: { field: string, order: 'ASC' | 'DESC' }, filter?: { field: string, value: any }): Promise<User> {
        const query = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.transactions', 'transaction')

            // .orderBy('transactions.createdAt')

        if (sort) {
            query
                .orderBy(`transactions.${sort.field}`, sort.order)
        }

        if (filter) {
            query
                .where(`transactions.${filter.field}`, filter.value)
        }

        return query.getOne();
    }

    async changeBalance(amount: number, userId: string, type: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);

        user.balance = type === 'credit' ? user.balance + amount : user.balance - amount;

        return await this.userRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}