import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  loginForm = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  })

  constructor(private apiService: ApiserviceService, private route: Router){}

  ngOnInit(): void {
    
  }

  login() {
    if (this.loginForm.valid) {
      this.apiService.verifyAdmin(this.loginForm.value).subscribe(
        (response: any) => {
          console.log('Response:', response);
  
          // Extract from the response
          const adminid = response.adminid;
          const token = response.token;
          const dp = response.profile_picture;
          console.log('Token:', token);
  
          // Store the token in local storage (or a service if needed)
          localStorage.setItem('authToken', token);
          localStorage.setItem('id', adminid);
          localStorage.setItem('adminDetails', JSON.stringify(response.details));
          localStorage.setItem('profile_picture', dp);
  
          // Navigate to the desired page
          if(token != null || token != undefined){
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Signed in successfully"
            });
            this.route.navigate(['/main/Home/']);
          }else{
            console.error('Invalid Login');
            // alert('Incorrect Email or Password');
            Swal.fire({
              title: "Invalid Login",
              // text: "Fill out the Email and Password",
              icon: "error"
            });
          }
        },
        error => {
          console.error('Error logging in:', error);
          // alert('Invalid Email or Password');
          Swal.fire({
            title: "Invalid Email or Password",
            // text: "Fill out the Email and Password",
            icon: "error"
          });
          this.loginForm.reset();
        }
      );
    } else {
      console.error('Form is not valid');
      // alert('Form is not valid');
      Swal.fire({
        title: "Form is not Valid",
        text: "Fill out the Email and Password",
        icon: "error"
      });
      this.loginForm.reset();
    }
  }

}
