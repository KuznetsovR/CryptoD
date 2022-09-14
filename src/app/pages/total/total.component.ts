import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
