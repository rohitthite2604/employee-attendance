import { Component, OnInit } from '@angular/core';
import { Policy, PolicyService } from '../../service/policy.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-policy-documents',
  imports: [NgIf, NgFor, FormsModule, QuillModule],
  templateUrl: './policy-documents.component.html',
  styleUrl: './policy-documents.component.css'
})
export class PolicyDocumentsComponent implements OnInit {

  policies: any[] = [];
  newPolicy = { policyType: '', content: '' };
  isAddingPolicy = false;
  selectedPolicy: any = null;
  isEditingPolicy = false;

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies() {
    this.policyService.getPolicies().subscribe((data: any[]) => {
      this.policies = data;
    });
  }

  startAddingPolicy() {
    this.isAddingPolicy = true;
    this.newPolicy = { policyType: '', content: '' };
  }

  cancelAdding() {
    this.isAddingPolicy = false;
  }

  saveNewPolicy() {
    if (this.newPolicy.policyType && this.newPolicy.content) {
      this.policyService.addPolicy(this.newPolicy).subscribe(() => {
        this.loadPolicies();
        this.isAddingPolicy = false;
      });
    }
  }

  selectPolicy(policy: any) {
    this.selectedPolicy = policy;
    this.isEditingPolicy = false;
  }

  startEditing(policy: any) {
    this.selectedPolicy = policy;
    this.isEditingPolicy = true;
  }

  cancelEditing() {
    this.isEditingPolicy = false;
  }

  updatePolicy(policy: any) {
    this.policyService.updatePolicy(policy).subscribe(() => {
      this.loadPolicies();
      this.isEditingPolicy = false;
    });
  }

  deletePolicy(policyId: number) {
    this.policyService.deletePolicy(policyId).subscribe(() => {
      this.loadPolicies();
    });
  }
}