import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Not, Repository} from 'typeorm';
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
        try {
            const user = new User();
            user.email = signupDto.email;
            user.fullName = signupDto.fullName;
            user.password = signupDto.password;
            user.balance = 500;

            return this.userRepository.save(user);
        } catch (error) {
            console.log('error', error.message);
            throw new HttpException(error.message, 400);
        }
    }

    findAll(id: string): Promise<User[]> {
        try {
            return this.userRepository.find({
                where: { id: Not(id) }
            });
        } catch (error) {
            console.log('error', error.message);
            throw new HttpException(error.message, 400);
        }
    }

    findOneByEmail(email: string): Promise<User> {
        try {
            return this.userRepository.findOne({email});
        } catch (error) {
            console.log('error', error.message);
            throw new HttpException(error.message, 400);
        }
    }

    findOne(id: string): Promise<User> {
        try {
            return this.userRepository.findOne(id);
        } catch (error) {
            console.log('error', error.message);
            throw new HttpException(error.message, 400);
        }
    }

    async changeBalance(amount: number, userId: string, type: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne(userId);

            user.balance = type === 'credit' ? user.balance + amount : user.balance - amount;

            return await this.userRepository.save(user);
        } catch (error) {
            console.log('error', error.message);
            throw new HttpException(error.message, 400);
        }
    }
}