import { Injectable } from '@angular/core';
import { Token } from '../dapp-radar/dapp-radar.service';

/**
 * Service for all interactions with user and local storage
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser: User = new User();
  private _userLocalStorageKey = 'User';
  constructor() {
    const user: string | null = localStorage.getItem(this._userLocalStorageKey);
    if (user) {
      this.currentUser = new User(JSON.parse(user));
    }
  }

  addUserWallet(walletAddress: string): Error | UserWallet {
    if (this.currentUser.wallets.find((w) => w.address === walletAddress)) {
      throw new Error('Wallet already exists');
    }
    const newWallet: UserWallet = new UserWallet({ address: walletAddress });
    this.currentUser = new User({ wallets: [...this.currentUser.wallets, newWallet] });
    this.updateLocalStorageUser();
    return newWallet;
  }

  addTokenToWallet(walletAddress: string, token: Token, balance: number) {
    const wallet = this.currentUser.wallets.find((w) => walletAddress === w.address);
    if (wallet) {
      const tokenIndex = wallet.tokenList.findIndex((t) => t.symbol === token.symbol);
      if (tokenIndex !== -1) {
        // if token already exists in the wallet, we change it
        wallet.tokenList[tokenIndex] = { ...token, balance };
      } else {
        // otherwise we add it
        wallet.tokenList.push({ ...token, balance });
      }
      this.updateLocalStorageUser();
    } else {
      throw new Error('No wallet found');
    }
  }

  updateLocalStorageUser(): void {
    localStorage.setItem(this._userLocalStorageKey, JSON.stringify(this.currentUser));
  }
}

export class User {
  wallets: UserWallet[];
  constructor(item?: Partial<User>) {
    this.wallets = item?.wallets?.length ? item?.wallets.map((w) => new UserWallet(w)) : [];
  }
}

export class UserWallet {
  address: string;
  tokenList: UserToken[];
  constructor(item: Partial<UserWallet> & Pick<UserWallet, 'address'>) {
    this.address = item.address;
    this.tokenList = item?.tokenList || [];
  }
  get totalBalanceInFiat(): number {
    let totalBalance = 0;
    for (const token of this.tokenList) {
      totalBalance += token.balance * token.priceInFiat;
    }
    return totalBalance;
  }
}

export interface UserToken extends Token {
  balance: number;
}
