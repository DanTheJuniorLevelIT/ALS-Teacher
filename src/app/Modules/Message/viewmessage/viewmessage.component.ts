import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-viewmessage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewmessage.component.html',
  styleUrl: './viewmessage.component.css'
})
export class ViewmessageComponent {

  currentDate: Date;

  constructor() {
    this.currentDate = new Date(); // Initialize with the current date and time
  }

}
