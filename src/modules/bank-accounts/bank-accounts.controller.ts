import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly service: BankAccountsService) {}

  // ⚠userId temporal (pruebas)
  private readonly TEMP_USER_ID = 1;

  @Post()
  create(@Body() dto: CreateBankAccountDto) {
    return this.service.create(dto, this.TEMP_USER_ID);
  }

  @Get()
  findAll() {
    return this.service.findAll(this.TEMP_USER_ID);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id, this.TEMP_USER_ID);
  }
}
