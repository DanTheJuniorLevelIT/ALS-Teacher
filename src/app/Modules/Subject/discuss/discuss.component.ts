import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

@Component({
  selector: 'app-discuss',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './discuss.component.html',
  styleUrl: './discuss.component.css'
})
export class DiscussComponent implements OnInit{

  subjectID: number | null = null;

  isModalOpen = false;

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the subjectID from localStorage
    const storedSubjectID = localStorage.getItem('subjectID');
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      console.log('Retrieved Subject ID from localStorage:', this.subjectID);
    } else {
      console.error('No subjectID found in localStorage.');
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  navigateToDiscussions() {
    const storedSubjectID = localStorage.getItem('subjectID');
    // Store the subjectID in localStorage
    // localStorage.setItem('assid', assID.toString());

    // Navigate to the modules page
    // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', 'discuss', 'discussion']);
  }

}
