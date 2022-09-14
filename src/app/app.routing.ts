import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/wallets',
    pathMatch: 'full',
  },
  {
    path: 'total',
    pathMatch: 'full',
    loadChildren: () => import('./pages/total/total.module').then((m) => m.TotalModule),
  },
  {
    path: 'wallets',
    pathMatch: 'full',
    loadChildren: () => import('./pages/wallets/wallets.module').then((m) => m.WalletsModule),
  },
  {
    path: 'wallets/:walletAddress',
    pathMatch: 'full',
    loadChildren: () => import('./pages/wallet/wallet.module').then((m) => m.WalletModule),
  },
  {
    path: 'nfts',
    pathMatch: 'full',
    loadChildren: () => import('./pages/nfts/nfts.module').then((m) => m.NftsModule),
  },
  {
    path: 'charts',
    pathMatch: 'full',
    loadChildren: () => import('./pages/charts/charts.module').then((m) => m.ChartsModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
