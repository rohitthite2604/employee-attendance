import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { MatButtonModule } from '@angular/material/button';
import { PolicyService } from '../../../service/policy.service';
import { ViewPolicyDialogComponent } from '../view-policy-dialog/view-policy-dialog.component';

@Component({
  selector: 'app-add-policy-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    QuillModule,
    MatButtonModule
  ],
  templateUrl: './add-policy-dialog.component.html',
  styleUrls: []
})
export class AddPolicyDialogComponent {
  policyType = '';
  content = '';

  dialogRef = inject(MatDialogRef<ViewPolicyDialogComponent>);
  private policyService = inject(PolicyService);

  constructor() {}

  savePolicy() {
    if (this.policyType && this.content) {
      const newPolicy = { policyType: this.policyType, content: this.content };
      this.policyService.addPolicy(newPolicy).subscribe(() => {
        this.dialogRef.close('refresh');
      });
    }
  }
}
