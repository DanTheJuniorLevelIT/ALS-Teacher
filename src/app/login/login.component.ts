import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { CommonModule } from '@angular/common';

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
  
          // Extract the token from the response
          const token = response.token;
          console.log('Token:', token);
  
          // Store the token in local storage (or a service if needed)
          localStorage.setItem('authToken', token);
  
          // Navigate to the desired page
          if(token != null || token != undefined){
            this.route.navigate(['/main/Home/']);
          }else{
            console.error('Invalid Login');
            alert('Incorrect Email or Password');
          }
        },
        error => {
          console.error('Error logging in:', error);
          alert('Invalid Email or Password');
        }
      );
    } else {
      console.error('Form is not valid');
      alert('Form is not valid');
    }
  }

}
