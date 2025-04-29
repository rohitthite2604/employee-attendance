import { Component, OnInit } from '@angular/core';
import { Policy, PolicyService } from '../../service/policy.service';
import { NgFor } from '@angular/common';
import { ViewPolicyReadonlyDialogComponent } from './view-policy-readonly-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-policy',
  imports: [NgFor],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.css'
})
export class PolicyComponent implements OnInit {
  policies: Policy[] = [];

  constructor(private policyService: PolicyService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(){
    this.policyService.getPolicies().subscribe(data => {
      this.policies = data;
    });
  }

  openViewPolicy(policy: Policy) {
    this.dialog.open(ViewPolicyReadonlyDialogComponent, {
      data: { policy },
      width: 'auto',
      maxWidth: 'none',
    });
  }

  


}
