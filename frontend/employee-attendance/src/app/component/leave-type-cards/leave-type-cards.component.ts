import { Component, Input } from '@angular/core';
import { LeaveType } from '../../service/leave-type.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-leave-type-cards',
  imports: [NgFor],
  templateUrl: './leave-type-cards.component.html',
  styleUrl: './leave-type-cards.component.css'
})
export class LeaveTypeCardsComponent {
  @Input() leaveTypes: LeaveType[] = [];

}
