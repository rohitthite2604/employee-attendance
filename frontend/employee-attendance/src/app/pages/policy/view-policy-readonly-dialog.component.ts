import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Policy } from '../../service/policy.service';

@Component({
  selector: 'app-view-policy-readonly-dialog',
  standalone: true,
  templateUrl: './view-policy-readonly-dialog.component.html',
  imports: [MatDialogModule], 
})
export class ViewPolicyReadonlyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { policy: Policy },
    private dialogRef: MatDialogRef<ViewPolicyReadonlyDialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
