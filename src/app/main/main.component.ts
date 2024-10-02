import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  tok: any;

  constructor(private api: ApiserviceService, private route: Router){}

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    this.tok = authToken;
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('show');
    }
  }

  closeNavbar() {
    const navbar = document.querySelector('.sidebar');
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }

  logout(token: any) {
    Swal.fire({
      title: "Are you sure you want to Logout?",
      // text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        if (token) {
          this.api.outAdmin(token).subscribe(
            (response: any) => {
              console.log(response);
              localStorage.removeItem('authToken'); // Remove the token from localStorage
              this.route.navigate(['/login']);      // Navigate to the login page
            },
            error => {
              if (error.status === 401) {
                console.error('Unauthenticated. Please login again.');
                this.route.navigate(['/login']);  // Redirect to login if unauthenticated
              } else {
                console.error('Logout error:', error);
              }
            }
          );
        } else {
          console.error('No token found for logout');
        }
      }
    });
    // if (token) {
    //   this.api.outAdmin(token).subscribe(
    //     (response: any) => {
    //       console.log(response);
    //       localStorage.removeItem('authToken'); // Remove the token from localStorage
    //       this.route.navigate(['/login']);      // Navigate to the login page
    //     },
    //     error => {
    //       if (error.status === 401) {
    //         console.error('Unauthenticated. Please login again.');
    //         this.route.navigate(['/login']);  // Redirect to login if unauthenticated
    //       } else {
    //         console.error('Logout error:', error);
    //       }
    //     }
    //   );
    // } else {
    //   console.error('No token found for logout');
    // }
  }
}
