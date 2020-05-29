import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuth()) {
      return true;
    }

    this.router.navigate(['/login']);
  }

}
