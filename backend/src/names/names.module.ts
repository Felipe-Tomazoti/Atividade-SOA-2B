import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NamesService } from './names.service';
import { NamesController } from './names.controller';

@Module({
  imports: [HttpModule],
  controllers: [NamesController],
  providers: [NamesService],
  exports: [NamesService],
})
export class NamesModule {}
