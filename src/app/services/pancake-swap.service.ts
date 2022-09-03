import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PancakeSwapService {
  pancakePath = 'https://api.pancakeswap.info/api/v2/tokens'

  constructor(private http: HttpClient) {}

  get() {
    this.http.get<PancakeTokens>(this.pancakePath).subscribe((res: PancakeTokens) => {
      const tokenList = Object.entries(res.data).map(([address, tokenInfo]) => {
        return {
          address,
          name: tokenInfo.name,
          symbol: tokenInfo.symbol,
          price: tokenInfo.price,
        }
      })
      console.log(tokenList)
    })
  }
  getTokenPriceByAddress(address: string): Observable<number> {
    return this.http.get<PancakeToken>(`${this.pancakePath}/${address}`)
      .pipe(map((token: PancakeToken) => +token.data.price))
  }

}
export interface PancakeToken {
  updated_at: number;
  data: PancakeTokenInfo;
}
export interface PancakeTokens {
  updated_at: number;
  data: {
    [key: string]: PancakeTokenInfo; // key is token address
  };
}

export interface PancakeTokenInfo {
  name: string;
  symbol: string;
  price: string;
  price_BNB: string;
}
