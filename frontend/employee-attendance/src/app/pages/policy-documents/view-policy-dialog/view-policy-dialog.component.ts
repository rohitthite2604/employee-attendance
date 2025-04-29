import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Policy, PolicyService } from '../../../service/policy.service';

@Component({
  selector: 'app-view-policy-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    QuillModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './view-policy-dialog.component.html',
  styleUrls: []
})
export class ViewPolicyDialogComponent {
  isEditing = false;
  content = '';

  dialogRef = inject(MatDialogRef<ViewPolicyDialogComponent>);
  private policyService = inject(PolicyService);
  public data = inject<{ policy: Policy }>(MAT_DIALOG_DATA);

  constructor() {
    this.content = this.data.policy.content;
  }

  enableEdit() {
    this.isEditing = true;
  }

  saveEdit() {
    const updatedPolicy = {
      ...this.data.policy,
      content: this.content
    };
    this.policyService.updatePolicy(updatedPolicy).subscribe(() => {
      this.isEditing = false;
      this.data.policy.content = this.content;
    });
  }

  deletePolicy() {
    if (confirm('Are you sure you want to delete this policy?')) {
      this.policyService.deletePolicy(this.data.policy.policyId!).subscribe(() => {
        this.dialogRef.close('refresh');
      });
    }
  }
}
