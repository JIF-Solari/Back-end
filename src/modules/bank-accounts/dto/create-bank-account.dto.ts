import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateBankAccountDto {
  @IsNotEmpty()
  bankName: string;

  @IsNotEmpty()
  accountType: string; // AHORROS / CORRIENTE

  @IsIn(['PEN', 'USD'])
  currency: string;

  @Length(13, 20)
  accountNumber: string;

  @IsOptional()
  alias?: string;
}
