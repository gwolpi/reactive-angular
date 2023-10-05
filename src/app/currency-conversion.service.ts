import {inject, Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {catchError, delay, firstValueFrom, map, Observable, of} from "rxjs";

@Injectable()
export class CurrencyConversionService {
  private readonly httpClient = inject(HttpClient);
  private readonly currencyConversionUrl = 'http://api.exchangeratesapi.io/latest';
  private readonly apiKey = '8fe396903d34cf186b5df296ccc86b68';

  getCurrencyRateFor(currencyCode: string): Observable<number> {
    const delayAmount = currencyCode === 'JPY' ? 2000 : 0;
    return this.httpClient.get<number>(this.currencyConversionUrl, {
      params: new HttpParams({
        fromObject: {
          'access_key': this.apiKey,
          base: currencyCode,
          symbols: 'EUR',
        }
      })
    }).pipe(
      delay(delayAmount),
      map((response: any) => response.rates.EUR as number),
      catchError((err) => {
        console.error(err);
        return of(1)
      }),
    );
  }

  getCurrencyRateForPromise(currencyCode: string): Promise<number> {
    return firstValueFrom(this.getCurrencyRateFor(currencyCode));
  }
}

@NgModule({
  providers: [CurrencyConversionService],
  imports: [CommonModule, HttpClientModule]
})
export class CurrencyConversionModule {}
