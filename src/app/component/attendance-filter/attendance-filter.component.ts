import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-attendance-filter',
  imports: [],
  templateUrl: './attendance-filter.component.html',
  styleUrl: './attendance-filter.component.css'
})
export class AttendanceFilterComponent {

  @Output() filterChanged = new EventEmitter<string>(); // Emits the selected value

  onFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.filterChanged.emit(target.value); // Sends the selected filter value
  }

}
