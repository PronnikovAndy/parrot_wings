import {Controller, Get, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {AuthGuard} from "@nestjs/passport";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll(): Promise<User[]> {
        return await this.userService.findAll();
    }
}
