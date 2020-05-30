import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { StartLoading, StopLoading } from '../shared/ui.actions';
import { SetAuthenticated, SetUnauthenticated } from './auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService,
              private uiService: UIService,
              private store: Store<AppState>) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(new SetUnauthenticated());
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
}
