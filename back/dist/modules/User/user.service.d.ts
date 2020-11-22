import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupDto } from "../Auth/dto/auth.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(signupDto: SignupDto): Promise<User>;
    findAll(id: string): Promise<User[]>;
    findOneByEmail(email: string): Promise<User>;
    findOne(id: string): Promise<User>;
    changeBalance(amount: number, userId: string, type: string): Promise<User>;
}
