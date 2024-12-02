import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiserviceService } from '../../../apiservice.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  // Character counters
  newPasswordCharCount = 0;
  confirmPasswordCharCount = 0;

  admin: any;
  studentpic: any;
  id: any;
  selectedFile: File | null = null;
  profilePicOfStudent: { image?: string } = {}; // Ensure profilePicOfStudent is initialized
  profilePic: any; // Ensure profilePicOfStudent is initialized
  progress = 0;
  isUploading = false;


  updateForm = new FormGroup({
    oldpassword: new FormControl(null),
    password: new FormControl(null),
    password_confirmation: new FormControl(null)
  })
  

  constructor(private apiserve: ApiserviceService, private fb: FormBuilder) { 
  }


  ngOnInit(): void {
    const token = localStorage.getItem('authToken'); // Retrieve Token from localStorage
    this.id = localStorage.getItem('id');
    console.log(this.id);
    this.profilePic = localStorage.getItem('profile_picture');
    this.admin = this.getAdminDetails();
    // this.getLearnerInfo(this.id);
    // if (token) {
    //   this.studentservice.getLearnerByToken(token).subscribe({
    //     next: (data) => {
    //       this.learner = data;
    //       // Assuming the id is a property of the returned data
          
    //     },
    //     error: (err) => {
    //       console.error('Error fetching learner data', err);
    //     }
    //   });
    // } else {
    //   console.error('No Token Found. User is not authenticated');
    // }
  }

  // Method to toggle password visibility
  togglePasswordVisibility(field: string): void {
    switch (field) {
      case 'old':
        this.showOldPassword = !this.showOldPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  // Method to update character count
  updateCharacterCount(field: string, event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    if (field === 'new') {
      this.newPasswordCharCount = input.length;
    } else if (field === 'confirm') {
      this.confirmPasswordCharCount = input.length;
    }
  }

  getAdminDetails() {
    const details = localStorage.getItem('adminDetails');
    return details ? JSON.parse(details) : null;
  }

  onFileSelect(event:any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        // Once the file is read, set the preview URL to 'profilePic'
        reader.onload = (e: ProgressEvent<FileReader>) => {
            this.profilePic = e.target?.result; // This will set the profilePic to the file URL
        };

        reader.readAsDataURL(file); // Read file as data URL for preview
    }
  }

  uploadProfilePicture() {
    if(!this.selectedFile) {
      alert('Please select a file first');
      return;
    }

    const formData  = new FormData();
    formData.append('profile_picture', this.selectedFile);
    formData.append('id', this.id);

    this.apiserve.uploadProfilePicture(formData, this.id).subscribe((result: any) => {
      //Local
      const newImageUrl = `http://localhost:8000/storage/profile_pictures/${result.image_name}`;
      //Server
      // const newImageUrl = `http://10.0.118.175:8000/storage/profile_pictures/${result.image_name}`;
      localStorage.setItem('profile_picture', newImageUrl);
      console.log(result);
      this.isUploading = true;
      this.progress = 20;

      const interval = setInterval(() => {
        if(this.progress < 100) {
          this.progress += 20;
        } else {
          clearInterval(interval);
          this.isUploading = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Profile Picture Uploaded Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          this.apiserve.updateProfilePic(newImageUrl);
        }
      }, 100);
      // Update the learner's image path to point to the Laravel assets folder
      // this.profilePicOfStudent.image = `http://localhost:8000/assets/profile_pictures/${result.image_name}`;
      // console.log(this.profilePicOfStudent);
      // this.getLearnerInfo(this.id);
    })
  }


  onSubmit() {
    if (this.updateForm.valid) {
      this.apiserve.updateAdminPassword(this.updateForm.value, this.id).subscribe(
        (result: any) => {
          if (result && result.message === 'Password updated successfully') {
            // SweetAlert2 success message
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Password Updated Successfully",
              showConfirmButton: false,
              timer: 1500
            });
            this.updateForm.reset();
          } else {
            // Handle unexpected response structure
            console.log('Unexpected response:', result);
          }
        },
        (error) => {
          // Handle error response from the server
          if (error.status === 400) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Old password does not match",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An error occurred",
              text: "Please try again",
              showConfirmButton: true,
            });
          }
        }
      );
    } else {
      // Invalid form submission error message
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Invalid Form",
        text: "Please fill out all fields correctly.",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
