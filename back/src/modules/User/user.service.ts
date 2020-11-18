
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {SignupDto} from "../Auth/dto/auth.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    create(signupDto: SignupDto): Promise<User> {
        const user = new User();
        user.email = signupDto.email;
        user.fullName = signupDto.fullName;
        user.password = signupDto.password;

        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ email });
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}