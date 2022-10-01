import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BscApiService } from '../../services/bsc-api/bsc-api.service';
import { UserService, UserWallet } from '../../services/user/user.service';
import { DappRadarService } from '../../services/dapp-radar/dapp-radar.service';
import {CoingeckoService} from "../../services/coingecko/coingecko.service";

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
})
export class WalletsComponent implements OnInit {
  walletAddressToImport = '0x44dee0f49cf64d8ccbd27a8003372aca9b0cfab5';
  defaultTokensToImportQuantity = 20;
  wallets: UserWallet[] = [];
  constructor(
    private bsc: BscApiService,
    private dappRadarService: DappRadarService,
    private userService: UserService,
    private coingeckoService: CoingeckoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.wallets = this.userService.currentUser.wallets;
    this.updateCoinMarketCharts();
  }

  async importWallet() {
    const walletAddress = this.walletAddressToImport;
    try {
      this.userService.addUserWallet(walletAddress);
      await this.getWalletBalance(walletAddress)
    } catch (e) {
      /**
       * Todo: Add handling for duplicated wallets
       * for example open modal with 3 options:
       * 1. Merge amount of imported tokens with existing tokens
       * 2. delete previous wallet and add new
       * 3. close modal and do nothing
       *
       */
      console.error(e);
    }
  }
  async getWalletBalance(walletAddress: string) {
    const tokensArray = Object.values(await this.dappRadarService.getTokenList(true)).slice(0, this.defaultTokensToImportQuantity);
    (await this.bsc.getAccountBalance(tokensArray, walletAddress)).map((token) => {
      // We do not add tokens that user doesn't have
      if (token.balance) {
        this.userService.addTokenToWallet(walletAddress, token.token, token.balance)
      }
    });
    this.userService.updateLocalStorageUser();
    this.cdr.detectChanges()
  }
  async getCoingeckoIdForToken() {

  }
  updateCoinMarketCharts() {
    const symbolListsOfAllWallets = this.userService.currentUser.wallets.map((w) => w.tokenList.map((t) => t.symbol));
    const uniqueTokensSymbolList = symbolListsOfAllWallets.flat().filter((value, i, self) => {
      return self.indexOf(value) === i;
    });
    for (const symbol of uniqueTokensSymbolList) {
      this.coingeckoService.getCoinMarketChart(symbol).subscribe(res => {
        console.log(res)
      //  update coingecko token name (coins/list)
      })
    }
  }
}
