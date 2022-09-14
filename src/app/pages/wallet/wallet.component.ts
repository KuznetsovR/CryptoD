import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, UserWallet } from '../../services/user/user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent implements OnInit {
  wallet?: UserWallet;
  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.wallet = this.userService.currentUser.wallets.find(
      (wallet) => wallet.address === this.route.snapshot.paramMap.get('walletAddress')
    );
    console.log(this.wallet);
  }
}
