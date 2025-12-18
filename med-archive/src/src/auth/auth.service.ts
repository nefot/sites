import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UsersService} from "../users/users.service.js";
import {RegisterDto} from "./dto/register.dto.js";
import {LoginDto} from "./dto/login.dto.js";
import {AuthResponseDto} from "./dto/auth-response.dto.js";
import { User } from "../../entity/user.entity.js";


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
        const user = await this.usersService.create(registerDto);
        return this.generateAuthResponse(user);
    }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        const user = await this.usersService.validateUser(loginDto.email, loginDto.password);

        if (!user) {
            throw new UnauthorizedException('Неверный email или пароль');
        }

        return this.generateAuthResponse(user);
    }

    async getProfile(userId: number): Promise<User | null> {
        return this.usersService.findById(userId);
    }

    private generateAuthResponse(user: User): AuthResponseDto {
        const payload = {
            email: user.email,
            sub: user.id,
            username: user.username
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        };
    }
}