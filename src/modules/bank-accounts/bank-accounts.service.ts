import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly repo: Repository<BankAccount>,
  ) {}

  async create(dto: CreateBankAccountDto, userId: number) {
    const account = new BankAccount();

    account.bankName = dto.bankName;
    account.accountType = dto.accountType;
    account.currency = dto.currency;
    account.accountNumber = dto.accountNumber;
    account.alias = dto.alias;

    const user = new User();
    user.id = userId;

    account.user = user;

    return await this.repo.save(account);
  }

  findAll(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
    });
  }

  async remove(id: number, userId: number) {
    const account = await this.repo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!account) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    return this.repo.remove(account);
  }
}
