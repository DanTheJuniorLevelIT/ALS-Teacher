import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit{

  isLoading: boolean = false; // This controls the loader visibility

  private intervalId: any; // To store the interval reference
  isModalOpen = false;
  isModalOpen2 = false;
  isModalOpen3 = false;
  currentDate = new Date();
  messages: any;
  students: any;
  selectedRecipient: string = ''; 
  
  selectedMessage: any = null;
  replyText: string = '';

  viewMessage(msg: any) {
    this.selectedMessage = msg;
    this.isModalOpen3 = true;
  }

  sendReply(lrn: any) 
  {
      if (this.replyText.trim()) {
          const replyPayload = {
              lrn: lrn,
              messages: this.replyText,
              adminID: localStorage.getItem('id'), // Assuming the sender is the logged-in admin
          };

          this.apiserve.sendReply(replyPayload).subscribe(
              response => {
                  console.log('Reply sent successfully:', response);
                  // alert('Reply sent successfully!');
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Reply sent successfully!",
                    showConfirmButton: false,
                    timer: 1000
                  });
                  this.isModalOpen3 = false;
                  this.replyText = ''; // Clear the reply box
                  this.loadMessage(localStorage.getItem('id')); // Reload messages to show the updated one
              },
              error => {
                  console.error('Error sending reply:', error);
                  alert('Failed to send reply.');
              }
          );
      } else {
          alert('Reply cannot be empty.');
      }
  }




  constructor(private apiserve: ApiserviceService, private route: Router) {
    this.currentDate = new Date(); // Initialize with the current date and time
  }
  ngOnInit(): void {
    const adminid = localStorage.getItem('id');
    this.student(adminid);
    // this.loadMessage(adminid);

    this.spinner();

    // Set an interval to refresh discussions every 30 seconds
    this.intervalId = setInterval(() => {
      this.loadMessage(adminid);
    }, 30000); // = 30 seconds
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  spinner() {
    this.isLoading = true; // Show the loader before the data is loaded

    // Simulate data fetching (you can replace this with an actual service call)
    setTimeout(() => {
      this.isLoading = false; // Hide the loader after data is fetched
    }, 30000); // Simulated delay of 30 seconds
  }

  loadMessage(id: any){
    this.apiserve.getMessages(id).subscribe((msg: any)=>{
      this.messages = msg;
      console.log(this.messages);
    })
  }

  student(id: any){
    this.apiserve.student(id).subscribe((stud: any)=>{
      this.students = stud;
      console.log(this.students);
    })
  }

  onAddMessage() {
    this.isModalOpen2 = true;
  }

  closeModal2() {
    this.isModalOpen2 = false;
  }

  closeModal3() {
    this.isModalOpen3 = false;
  }

  sendMessage() {
    const recipient = (document.getElementById('recipient') as HTMLSelectElement).value;
    const messageText = (document.getElementById('message') as HTMLTextAreaElement).value;
  
    if (!recipient) {
      // alert('Please select a recipient.');
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please select a recipient.",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
  
    if (!messageText.trim()) {
      // alert('Message cannot be empty.');
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Message cannot be empty.",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
  
    const messagePayload = {
      lrn: recipient,
      messages: messageText,
      adminID: localStorage.getItem('id'), // Assuming adminID is stored in localStorage
    };
  
    this.apiserve.sendMessage(messagePayload).subscribe(
      response => {
        console.log('Message sent successfully:', response);
        // alert('Message sent successfully!');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Message sent successfully!",
          showConfirmButton: false,
          timer: 1000
        });
        this.closeModal2();
        this.loadMessage(localStorage.getItem('id')); // Reload messages to update the list
      },
      error => {
        console.error('Error sending message:', error);
        alert('Failed to send message.');
      }
    );
  }
  

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
