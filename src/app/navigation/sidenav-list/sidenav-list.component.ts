import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState, getIsAuth } from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() private sidenavClose = new EventEmitter<void>();
  isAuth: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.isAuth = this.store.select(getIsAuth);
  }

  onItemClick() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.onItemClick();
    this.authService.logout();
  }
}
