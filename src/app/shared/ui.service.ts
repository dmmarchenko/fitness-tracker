import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class UIService {
  loadingStateChanged = new Subject<boolean>();


  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBar(message: string, duration: number) {
    this.snackBar.open(message, null, {duration});
  }
}
