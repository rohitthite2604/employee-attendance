import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AddPolicyDialogComponent } from './add-policy-dialog/add-policy-dialog.component';
import { ViewPolicyDialogComponent } from './view-policy-dialog/view-policy-dialog.component';
import { Policy, PolicyService } from '../../service/policy.service';
@Component({
  selector: 'app-policy-documents',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './policy-documents.component.html',
  styleUrls: ['./policy-documents.component.css']
})
export class PolicyDocumentsComponent implements OnInit {
  policies: Policy[] = [];

  constructor(private policyService: PolicyService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadPolicies();
  }

  loadPolicies() {
    this.policyService.getPolicies().subscribe(data => {
      this.policies = data;
    });
  }

  openAddPolicyDialog() {
    const dialogRef = this.dialog.open(AddPolicyDialogComponent, {
      width: 'auto',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.loadPolicies();
      }
    });
  }

  openViewPolicyDialog(policy: Policy) {
    const dialogRef = this.dialog.open(ViewPolicyDialogComponent, {
      data: { policy },
      width: 'auto',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.loadPolicies();
      }
    });
  }
}
