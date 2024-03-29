import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../Common/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  showAlert(type: 'Success' | 'Error' | 'Process', message: string, closeAction: () => void) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '450px',
      data: { type, message, closeAction },
    });
  }
}
