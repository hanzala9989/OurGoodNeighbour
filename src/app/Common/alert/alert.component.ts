import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string; message: string; closeAction: () => void }
  ) {}

  close(action: () => void): void {
    this.dialogRef.close();
    if (action) {
      action();
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'Success':
        return 'check_circle';
      case 'Error':
        return 'cancel';
      case 'Process':
        return 'hourglass_full';
      default:
        return '';
    }
  }
}
