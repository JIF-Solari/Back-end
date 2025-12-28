import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const userFound = await this.userRepository.findOneBy({ email: createUserDto.email });

        if (userFound) {
            throw new BadRequestException("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        const newUser = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        const savedUser = await this.userRepository.save(newUser);

        // @ts-ignore
        delete savedUser.password;

        return savedUser;
    }
    async findOneByEmail(email: string){
        return this.userRepository.findOne({
            where: { email },
            select: ['id', 'name', 'email', 'password', 'role'],
        })
    }
}
