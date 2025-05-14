import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NamesModule } from './names/names.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NamesModule,
  ],
})
export class AppModule {}
