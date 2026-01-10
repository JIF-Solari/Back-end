import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginDTO } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDTO: LoginDTO) {
        const user = await this.usersService.findOneByEmail(loginDTO.email);

        if (!user) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        const isPasswordValid = await bcrypt.compare(
            loginDTO.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        const payload = { email: user.email, role: user.role };

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email: user.email,
        };
    }
}
