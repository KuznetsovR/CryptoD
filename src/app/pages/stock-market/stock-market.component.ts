import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-market',
  templateUrl: './stock-market.component.html',
  styleUrls: ['./stock-market.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockMarketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
