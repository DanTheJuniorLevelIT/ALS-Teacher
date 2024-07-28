import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mat',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './mat.component.html',
  styleUrl: './mat.component.css'
})
export class MatComponent {

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
}
