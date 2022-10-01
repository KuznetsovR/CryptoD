import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CoingeckoCoins } from './coingeckoCoins';

/**
 * Service for all interactions with Coingecko API
 */
@Injectable({
  providedIn: 'root',
})
export class CoingeckoService {
  private pathToCoingeckoApi = 'https://api.coingecko.com/api/v3';
  supportedCurrencies: string[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getSupportedCurrencies();
  }
  /**
   * Gets currencies for future requests to coingecko
   * it doesn't need reload parameter because currencies list does not change,
   * and you just need to get it in the ngOnInit
   */
  private getSupportedCurrencies() {
    this.http.get<string[]>(`${this.pathToCoingeckoApi}/simple/supported_vs_currencies`).subscribe((res: string[]) => {
      this.supportedCurrencies = res;
    });
  }
  getCoinData(id: number): Observable<CoingeckoTokenInfo> {
    return this.http.get<CoingeckoTokenInfo>(`${this.pathToCoingeckoApi}/coins/${id}/market_chart`).pipe(
      map((res) => {
        return new CoingeckoTokenInfo(res);
      })
    );
  }
  getCoinMarketChart(
    tokenSymbol: keyof typeof CoingeckoCoins, // symbol is object key
    vs_currency: string = 'usd',
    days: number = 30,
    interval = 'daily'
  ): Observable<CoingeckoMarketChart> {
    const coinGeckoId = CoingeckoCoins[tokenSymbol];
    const params = new HttpParams().set('vs_currency', vs_currency).set('days', days).set('interval', interval);
    return this.http.get<CoingeckoMarketChart>(`${this.pathToCoingeckoApi}/coins/${coinGeckoId}/market_chart`, { params });
  }
}

export interface CoingeckoMarketChart {
  // [timestamp, value]
  prices: [number, number][];
  market_caps: [number, number][];
  totalVolumes: [number, number][];
}

/**
 * CoingeckoTokenInfo and CoingeckoMarketData are not full because coingecko sends too much data, so we map it in needed fields
 */

export class CoingeckoTokenInfo {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: CoingeckoMarketData;
  constructor(item: CoingeckoTokenInfo) {
    this.id = item.id;
    this.symbol = item.symbol;
    this.name = item.name;
    this.image = item.image;
    this.market_data = item.market_data;
  }
}
export interface CoingeckoMarketData {
  current_price: {
    [key: string]: string;
  };
}
