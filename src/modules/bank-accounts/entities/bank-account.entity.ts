import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('bank_accounts')
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bankName: string; // BCP, Interbank

  @Column()
  accountType: string; // AHORROS / CORRIENTE

  @Column({ length: 3 })
  currency: string; // PEN / USD

  @Column({ length: 20 })
  accountNumber: string;

  @Column({ nullable: true })
  alias?: string;

  @ManyToOne(() => User, (user) => user.bankAccounts, {
    onDelete: 'CASCADE',
  })
  user: User;
}
