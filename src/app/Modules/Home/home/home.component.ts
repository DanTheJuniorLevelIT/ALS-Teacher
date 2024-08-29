import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  sub: any;

  // constructor(private apiserv: ApiserviceService){}

  isModalOpen = false;
  currentDate: Date;

  notificationsOpen = false;
  notifications = [
    { message: 'Emma Johnson have message you' },
    { message: 'Liam Smith submitted his activity' },
    { message: 'Ava Garcia sent a message' }
  ];

  constructor(private apiserv: ApiserviceService) {
    this.currentDate = new Date(); // Initialize with the current date and time
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleNotifications(): void {
    this.notificationsOpen = !this.notificationsOpen;
  }

  // ngOnInit(): void {
  //   // setInterval(() => {
  //   //   this.currentDate = new Date();
  //   // }, 60000);
  // }

  ngOnInit() {
    this.apiserv.getSubjects().subscribe(
      (response) => {
        this.sub = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

}
