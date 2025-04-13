import { Component } from '@angular/core';

@Component({
  selector: 'app-emp-dashboard-cards',
  imports: [],
  templateUrl: './emp-dashboard-cards.component.html',
  styleUrl: './emp-dashboard-cards.component.css'
})
export class EmpDashboardCardsComponent {

  currentTime: string = new Date().toLocaleTimeString();

  clockIn() {
    console.log("Clocked In!");
  }

}
