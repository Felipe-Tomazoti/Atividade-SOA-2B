import { Controller, Get, Query } from '@nestjs/common';
import { NamesService } from './names.service';
import {
  NameRankingQueryDto,
  LocationNamesQueryDto,
  CompareNamesQueryDto,
} from './dto/name-query.dto';

@Controller('names')
export class NamesController {
  constructor(private readonly namesService: NamesService) {}

  @Get('ranking')
  async getNameRanking(@Query() query: NameRankingQueryDto) {
    return this.namesService.getNameRanking(
      query.name,
      query.startDecade,
      query.endDecade,
    );
  }

  @Get('location')
  async getTopNamesByLocation(@Query() query: LocationNamesQueryDto) {
    return this.namesService.getTopNamesByLocation(query.location);
  }

  @Get('compare')
  async compareNames(@Query() query: CompareNamesQueryDto) {
    return this.namesService.compareNames(query.firstName, query.secondName);
  }
}
