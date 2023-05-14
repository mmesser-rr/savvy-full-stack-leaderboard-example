import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from "class-validator";

export class StatsDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  avatarUrl: string;

  @ApiProperty()
  @IsNumber()
  points: number;

  @ApiProperty()
  @IsIn([-1, 0, 1])
  deltaSign: 1 | 0 | -1;
}

export class UpdatePointsDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNumber()
  points: number;
}
