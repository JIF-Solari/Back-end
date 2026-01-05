import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // cambiar usuario
      password: 'postgres', // cambiar contraseña
      database: 'jif_backend',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BankAccountsModule,
  ],
})
export class AppModule {}
