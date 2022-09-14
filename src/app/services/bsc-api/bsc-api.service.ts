import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Token } from '../dapp-radar/dapp-radar.service';
import { Credentials } from '../../../credentials/credentials';

/**
 * Service for interaction with BscScan API
 */
@Injectable({
  providedIn: 'root',
})
export class BscApiService {
  bscApiPath = 'https://api.bscscan.com/api';
  weiInToken = 10 ** 18;
  /**
   *  5 max req per sec + 25ms (to prevent situation when internet is unstable and api can receive more than 5 requests)
   */
  delayForRequestInMs = 1000 / 5 + 25;
  constructor(private http: HttpClient) {}

  /**
   * Bscscan api supports only 5 req per sec, so we have to set delay for each request.
   * @param tokensToImport - array of tokens that have to be imported
   * @param address - user wallet address
   * @return tokenWithBalanceArray - array of tokens is returned after all request to bsc api are resolved
   */
  async getAccountBalance(tokensToImport: Token[], address: string): Promise<TokenWithBalance[]> {
    const tokensBalance: TokenWithBalance[] = [];
    const httpParams = new HttpParams()
      .set('module', 'account')
      .set('action', 'tokenbalance')
      .set('address', address)
      .set('tag', 'latest')
      .set('apikey', Credentials.BSC_API_KEY);
    let requestsCounter = 0;
    // made for returning tokensBalance only after all requests are responded
    await new Promise((resolve) => {
      const requestInterval = setInterval(() => {
        if (requestsCounter === tokensToImport.length) {
          clearInterval(requestInterval);
          resolve('done');
          return;
        }
        const token = tokensToImport[requestsCounter];
        this.getOneTokenBalance(token.contractAddress, httpParams).subscribe((balance) => {
          tokensBalance.push({ token, balance: balance / this.weiInToken });
        });
        requestsCounter++;
      }, this.delayForRequestInMs);
    });
    return tokensBalance;
  }

  getOneTokenBalance(contractAddress: string, params?: HttpParams): Observable<number> {
    if (!params) {
      params = new HttpParams()
        .set('module', 'account')
        .set('action', 'tokenbalance')
        .set('address', '0x44dee0f49cf64d8ccbd27a8003372aca9b0cfab5')
        .set('tag', 'latest')
        .set('apikey', Credentials.BSC_API_KEY);
    }
    params = params.set('contractAddress', contractAddress);
    return this.http.get<BscScanResponse>(this.bscApiPath, { params }).pipe(
      map((res: BscScanResponse) => {
        return +res.result;
      })
    );
  }
}

export interface BscScanResponse {
  status: string;
  message: string;
  result: string;
}

export interface TokenWithBalance {
  token: Token;
  balance: number;
}
