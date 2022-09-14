import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NftsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
