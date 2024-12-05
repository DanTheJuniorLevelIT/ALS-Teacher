import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {}

  submitForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.apiService.sendResetCode(this.forgotPasswordForm.value).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Reset code sent!',
            text: 'Check your email for the reset code.',
          });
          this.router.navigate(['/reset-password']); // Redirect to reset password page
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to send reset code. Please try again.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please provide a valid email address.',
      });
    }
  }
}
