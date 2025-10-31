import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration = 3000) {
    this.snackBar.open(message, 'OK', { duration, panelClass: ['toast-success'] });
  }

  error(message: string, duration = 4000) {
    this.snackBar.open(message, 'Fermer', { duration, panelClass: ['toast-error'] });
  }

  info(message: string, duration = 3000) {
    this.snackBar.open(message, 'OK', { duration, panelClass: ['toast-info'] });
  }
}
