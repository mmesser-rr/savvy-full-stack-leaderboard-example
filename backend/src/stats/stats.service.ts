import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { StatsDto } from "./dto/stats.dto";

@Injectable()
export class StatsService {
  private statsData: StatsDto[] = [];

  constructor() {
    // generate random 50 stats data
    const numOfStats = 50;

    for (let index = 0; index < numOfStats; index++) {
      const newStat: StatsDto = {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatarUrl: faker.image.avatar(),
        points: Math.floor(Math.random() * 1000),
        deltaSign: 0
      };
      this.statsData.push(newStat);
    }
  }

  async findStats(limit: number) {
    // sort by points
    this.statsData = this.statsData.sort((prev, next) => next.points - prev.points);

    return this.statsData.slice(0, limit || 30);
  }

  async updateStat(statId: string, newPoints: number) {
    try {
      const targetStat = this.statsData.find((stat) => stat.id === statId);
      const delta = newPoints - targetStat.points;
      targetStat.deltaSign = delta > 0 ? 1 : delta < 0 ? -1 : 0;
      targetStat.points = newPoints;
    }
    catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }
}
