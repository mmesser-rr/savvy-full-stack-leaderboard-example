import {
  Body,
  Controller,
  Get,
  Post,
  Query
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';

import { StatsDto, UpdatePointsDto } from "./dto/stats.dto";
import { StatsService } from "./stats.service";

@ApiTags('Stats management')
@Controller('api/stats')
export class StatsController {
  constructor(private statsService: StatsService) { }

  @Post('updateStat')
  @ApiOkResponse({ type: () => Boolean })
  async updateStat(
    @Body() payload: UpdatePointsDto,
  ): Promise<boolean> {
    return await this.statsService.updateStat(
      payload.id,
      payload.points,
    );
  }

  @Get('findStats')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({ type: () => Array<StatsDto> })
  async findStats(
    @Query('limit') limit: number | undefined,
  ): Promise<StatsDto[]> {
    return await this.statsService.findStats(limit);
  }
}
