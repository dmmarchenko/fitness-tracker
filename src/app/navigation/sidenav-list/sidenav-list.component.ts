import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() private sidenavClose = new EventEmitter<void>();
  isAuth = false;

  private authChangeSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authChangeSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onItemClick() {
    this.sidenavClose.emit();
  }

  ngOnDestroy(): void {
    this.authChangeSub.unsubscribe();
  }

  onLogout() {
    this.onItemClick();
    this.authService.logout();
  }
}
