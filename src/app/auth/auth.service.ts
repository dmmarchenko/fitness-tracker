import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { StartLoading, StopLoading } from '../shared/ui.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService,
              private uiService: UIService,
              private store: Store<AppState>) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.trainingService.cancelSubscriptions();
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new StartLoading());
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(new StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new StopLoading());
        this.uiService.showSnackBar(error.message, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new StartLoading());
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(new StopLoading());
      })
      .catch(error => {
        this.uiService.showSnackBar(error.message, 3000);
        this.store.dispatch(new StopLoading());
      });
  }

  logout() {
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
