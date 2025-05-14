import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NamesService {
  private readonly baseUrl =
    'https://servicodados.ibge.gov.br/api/v2/censos/nomes';

  constructor(private readonly httpService: HttpService) {}

  async getNameRanking(name: string, startDecade: number, endDecade: number) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/${name}`),
    );
    return this.filterByDecadeRange(response.data, startDecade, endDecade);
  }

  async getTopNamesByLocation(location: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/ranking?localidade=${location}`),
    );
    return response.data.slice(0, 3);
  }

  async compareNames(firstName: string, secondName: string) {
    const [firstResponse, secondResponse] = await Promise.all([
      firstValueFrom(this.httpService.get(`${this.baseUrl}/${firstName}`)),
      firstValueFrom(this.httpService.get(`${this.baseUrl}/${secondName}`)),
    ]);

    return {
      firstName: firstResponse.data,
      secondName: secondResponse.data,
    };
  }

  private filterByDecadeRange(
    data: any[],
    startDecade: number,
    endDecade: number,
  ) {
    return data.filter((item) => {
      const decade = parseInt(item.periodo.split('[')[0]);
      return decade >= startDecade && decade <= endDecade;
    });
  }
}
