import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import DappRadarToken = dappRadar.DappRadarToken;
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DappRadarService {
  private _tokenCollection: TokenCollection = {};

  constructor(private http: HttpClient) {}

  async getTokenList(reload = false): Promise<TokenCollection> {
    if (!reload) {
      if (!this._tokenCollection) {
        this._tokenCollection = await firstValueFrom(this.http.get<TokenCollection>('../../../assets/tokens.json'));
      }
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
        .get<{ resultCount: number; pageCount: number; results: DappRadarToken[] }>(
          'https://prices-api-public.dappradar.com/v1/token-explorer/tokens',
          {
            params,
          }
        )
        .subscribe((res: { resultCount: number; pageCount: number; results: DappRadarToken[] }) => {
          for (const token of res.results) {
            this._tokenCollection[token.symbol] = new Token(token);
          }
          let importedPagesAmount = 1;
          for (let i = 2; i <= res.pageCount; i++) {
            const req = this.http.get<{ resultCount: number; pageCount: number; results: DappRadarToken[] }>(
              'https://prices-api-public.dappradar.com/v1/token-explorer/tokens',
              {
                params: params.set('Page', i),
              }
            );
            req.subscribe((res: { resultCount: number; pageCount: number; results: DappRadarToken[] }) => {
              importedPagesAmount++;
              for (const token of res.results) {
                this._tokenCollection[token.symbol] = new Token(token);
              }
              if (importedPagesAmount === res.pageCount) {
                resolve(this._tokenCollection);
              }
            });
          }
        });
    });
  }
}

declare module dappRadar {
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
