import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupDto } from "../Auth/dto/auth.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(signupDto: SignupDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOneByEmail(email: string): Promise<User>;
    findOne(id: string): Promise<User>;
    findAllUserTransaction(id: string, sort?: {
        field: string;
        order: 'ASC' | 'DESC';
    }, filter?: {
        field: string;
        value: any;
    }): Promise<User>;
    changeBalance(amount: number, userId: string, type: string): Promise<User>;
    remove(id: string): Promise<void>;
}
