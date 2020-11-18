import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupDto } from "../Auth/dto/auth.dto";
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(signupDto: SignupDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOneByEmail(email: string): Promise<User>;
    findOne(id: string): Promise<User>;
    remove(id: string): Promise<void>;
}
