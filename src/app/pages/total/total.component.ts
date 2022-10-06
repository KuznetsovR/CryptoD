import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {User, UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalComponent implements OnInit {
  public user!: User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser
  }
}
