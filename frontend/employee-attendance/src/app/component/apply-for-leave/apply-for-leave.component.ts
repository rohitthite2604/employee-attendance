import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveRequestService } from '../../service/leave-request.service';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-apply-for-leave',
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './apply-for-leave.component.html',
  styleUrl: './apply-for-leave.component.css'
})
export class ApplyForLeaveComponent {
  leaveCounts: any[] = []; // Holds leave types with their counts
  applyLeaveForm: FormGroup; // Form for applying for leave
  userId = 0;

  constructor(private leaveRequestService: LeaveRequestService, private authService: AuthService) {
    this.applyLeaveForm = new FormGroup({
      lcId: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId === null || isNaN(userId)) {
      console.error('User ID not found or invalid!');
      return;
    }
    this.userId = userId;
    
    this.fetchLeaveCounts();
  }

  fetchLeaveCounts(): void {
    this.leaveRequestService.getLeaveCounts(this.userId).subscribe(data => {
      this.leaveCounts = data;
      console.log('Leave Counts:', this.leaveCounts); // Log the leave counts
    });
  }

  applyForLeave(): void {
    if (this.applyLeaveForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    const payload = {
      userId: this.userId,
      lcId: Number(this.applyLeaveForm.value.lcId),
      startDate: this.applyLeaveForm.value.startDate,
      endDate: this.applyLeaveForm.value.endDate,
      description: this.applyLeaveForm.value.description
    };

    console.log('Payload:', payload);

    this.leaveRequestService.applyForLeave(payload).subscribe(
      response => {
        alert('Leave request submitted successfully.');
        this.applyLeaveForm.reset(); // Reset the form
      },
      error => {
        alert('Failed to submit leave request. Please try again.');
      }
    );
  }



}
