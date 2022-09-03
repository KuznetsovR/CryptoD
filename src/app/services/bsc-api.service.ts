import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {tokensArray} from "../tokensContracts";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BscApiService {
  bscApiPath = 'https://api.bscscan.com/api';
  weiInToken = 10**18;
  /**
   *  5 max req per sec + 25ms (to prevent situation when internet is unstable and api can receive more than 5 requests)
   */
  delayForRequestInMs = (1000 / 5) + 25
  constructor(private http: HttpClient) { }

  async getAccountBalance() {
    const tokensBalance: UserToken[] = [];
    const httpParams = new HttpParams()
      .set('module', 'account')
      .set('action', 'tokenbalance')
      .set('address', '0x44dee0f49cf64d8ccbd27a8003372aca9b0cfab5')
      .set('tag', 'latest')
      .set('apikey', 'RWI51XGQRYR8I44BGDG3XDD4Y3SAEPDS95')

    let requestsCounter = 0
    await new Promise(
      resolve => {
        const requestInterval = setInterval(() => {
          if (requestsCounter === tokensArray.length){
            clearInterval(requestInterval)
            resolve('done');
            return
          }
          const tokenIdx = requestsCounter
          this.getOneTokenBalance(tokensArray[tokenIdx].address, httpParams).subscribe(balance => {
            tokensBalance.push(new UserToken({
              ...tokensArray[tokenIdx],
              balance: balance / this.weiInToken
            }))
          })
          requestsCounter++
        }, this.delayForRequestInMs)
      }
    )
    return tokensBalance
  }

  getOneTokenBalance(contractAddress: string, params?:HttpParams): Observable<number> {
    if (params) {
      params = params.set('contractAddress', contractAddress)
    } else {
      params = new HttpParams()
        .set('module', 'account')
        .set('action', 'tokenbalance')
        .set('address', '0x44dee0f49cf64d8ccbd27a8003372aca9b0cfab5')
        .set('tag', 'latest')
        .set('apikey', 'RWI51XGQRYR8I44BGDG3XDD4Y3SAEPDS95')
    }
    return  this.http.get<BscScanResponse>(this.bscApiPath, {params})
      .pipe(map((res: BscScanResponse) => {
        return +res.result
      }))
  }
}

export interface BscScanResponse {
  status: string;
  message: string;
  result: string;
}

export class Token {
  address: string;
  name: string;
  symbol: string;
  constructor(item: Partial<Token>) {
    this.address = item.address || '';
    this.name = item.name || '';
    this.symbol = item.symbol || '';
  }
}

export class UserToken extends Token{
  balance: number | null;
  price: number | null;
  constructor(item: Partial<UserToken>) {
    super(item);
    this.balance = item.balance || null;
    this.price = item.price || null;
  }
}
