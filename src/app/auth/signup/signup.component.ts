import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getIsLoading } from '../../app.reducer';

const MINIMAL_ALLOWED_AGE = 18;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.isLoading = this.store.select(getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - MINIMAL_ALLOWED_AGE);
  }

  onSubmit(f: NgForm) {
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password
    });
  }
}
