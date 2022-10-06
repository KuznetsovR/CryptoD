import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RealEstateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
