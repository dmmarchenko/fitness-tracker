import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppState, getIsAuth } from '../app.reducer';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanLoad {

  constructor(private store: Store<AppState>, private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(getIsAuth)
      .pipe(
        take(1),
        tap(isAuth => {
          if (!isAuth) {
            this.router.navigate(['/login']);
          }
        })
      );
  }

}
