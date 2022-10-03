import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import DappRadarToken = dappRadar.DappRadarToken;
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class DappRadarService {
  private _tokenCollection: TokenCollection = {};

  constructor(private http: HttpClient) {}

  /**
   * if collection is empty, returns false, otherwise true
   */
  async getTokenList(reload = false): Promise<TokenCollection> {
    if (!reload && _.isEmpty(this._tokenCollection)) {
      return this._tokenCollection;
    }
    const maxPageSize = 25;
    const params = new HttpParams()
      .set('Blockchain', 'bsc')
      .set('Page', '1')
      .set('Sort', 'capInFiat')
      .set('Order', 'desc')
      .set('FilterRatioGreaterThan', '0.01')
      .set('ResultsPerPage', maxPageSize)
      .set('Currency', 'usd');
    return new Promise((resolve, reject) => {
      this.http
        .get<dappRadar.tokenListResponse>('https://prices-api-public.dappradar.com/v1/token-explorer/tokens', {
          params,
        })
        .subscribe((res: dappRadar.tokenListResponse) => {
          for (const token of res.results) {
            this._tokenCollection[token.symbol] = new Token(token);
          }
          this.getTokenListPagesFromSecondPage(res, resolve, params);
        });
    });
  }
  getTokenListPagesFromSecondPage(firstResponse: dappRadar.tokenListResponse, resolve: Function, params: HttpParams) {
    for (let i = 2; i <= firstResponse.pageCount; i++) {
      this.getTokenListPage(resolve, params, i);
    }
  }

  getTokenListPage(resolve: Function, params: HttpParams, pageIdx: number) {
    this.http
      .get<dappRadar.tokenListResponse>('https://prices-api-public.dappradar.com/v1/token-explorer/tokens', {
        params: params.set('Page', pageIdx),
      })
      .subscribe((res: dappRadar.tokenListResponse) => {
        for (const token of res.results) {
          this._tokenCollection[token.symbol] = new Token(token);
        }
        if (res.page === res.pageCount) {
          resolve(this._tokenCollection);
        }
      });
  }
}

declare module dappRadar {
  export interface tokenListResponse {
    resultCount: number;
    page: number;
    pageCount: number;
    results: DappRadarToken[];
  }
  export interface PriceInFiatChange {
    percentage: string;
    valueDate: Date;
  }

  export interface Changes {
    priceInFiat1h: PriceInFiatChange;
    priceInFiat24h: PriceInFiatChange;
    priceInFiat7d: PriceInFiatChange;
  }

  export interface DappRadarToken {
    id: string;
    coinIdInBlockchain: string;
    name: string;
    symbol: string;
    blockchain: string;
    images: string;
    priceInFiat: string;
    volumeInFiat: string;
    capInFiat: string;
    changes: Changes;
  }
}
export class Token {
  contractAddress: string;
  name: string;
  symbol: string;
  blockchain: string;
  images: { thumb: string; small: string; large: string };
  priceInFiat: number;
  constructor(item: DappRadarToken) {
    this.contractAddress = item.coinIdInBlockchain;
    this.name = item.name;
    this.symbol = item.symbol;
    this.blockchain = item.blockchain;
    /**
     * Images come in this format
     *  "{
     *  \"thumb\": \"https://assets.coingecko.com/coins/images/23510/thumb/0xea97c7c1c89d4084e0bfb88284fa90243779da9f.png?1644300084\",
     *  \"small\":\"https://assets.coingecko.com/coins/images/23510/small/0xea97c7c1c89d4084e0bfb88284fa90243779da9f.png?1644300084\",
     *  \"large\":\"https://assets.coingecko.com/coins/images/23510/large/0xea97c7c1c89d4084e0bfb88284fa90243779da9f.png?1644300084\"
     *  }"
     */
    this.images = JSON.parse(item.images);
    this.priceInFiat = +item.priceInFiat;
  }
}
export interface TokenCollection {
  [key: string]: Token;
}
