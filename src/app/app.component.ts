import { Component } from '@angular/core';
import {PancakeSwapService} from "./services/pancake-swap.service";
import {BscApiService, UserToken} from "./services/bsc-api.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CryptoD';
  constructor(private pancake: PancakeSwapService, private bsc: BscApiService) {}
  async get() {
    const tokens = await Promise.all((await this.bsc.getAccountBalance()).map(async (token) => {
      return new UserToken({
        ...token,
        price: await firstValueFrom(this.pancake.getTokenPriceByAddress(token.address))
      })
    }))
    console.log(tokens)
  }
}
