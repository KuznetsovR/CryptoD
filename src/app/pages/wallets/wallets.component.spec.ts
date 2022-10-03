import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsComponent } from './wallets.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('WalletsComponent', () => {
  let component: WalletsComponent;
  let fixture: ComponentFixture<WalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ WalletsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
