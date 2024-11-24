import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})
export class AssessmentComponent implements OnInit{

  subjectID: number | null = null;
  authtoken: any;
  moduleID: any;
  moduleTitle: any;
  

  assess: any;

  isModalOpen = false;

  createAssessment = new FormGroup({
    title: new FormControl(null),
    lesson_id: new FormControl(null),
    instruction: new FormControl(null),
    description: new FormControl(null),
    due_date: new FormControl(null)
  })

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the subjectID from localStorage
    const storedSubjectID = localStorage.getItem('classid');
    const token = localStorage.getItem('authToken');
    this.authtoken = token;
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      this.moduleID = storedModuleID;
      this.moduleTitle = storedModuleTitle;  // Convert the string to a number  // Convert the string to a number
      this.loadAssessments();
      console.log('Retrieved Subject ID from localStorage:', this.subjectID);
    } else {
      console.error('No subjectID found in localStorage.');
    }

    
  }

  loadAssessments(){
    this.apiService.getAssessment().subscribe(
      (response: any) => {
        this.assess = response;
        console.log(this.assess);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  save() {
    if (this.createAssessment.valid) {
      this.apiService.createAssess(this.createAssessment.value).subscribe(
        response => {
          console.log('Assessment created:', response);
          Swal.fire({
            title: "Added New Assessment",
            icon: "success"
          });
          this.loadAssessments();
          this.closeModal(); // Close the modal
          // Optionally, navigate to another page
          // this.router.navigate(['/some-route']);
        },
        error => {
          console.error('Error creating assessment:', error);
          Swal.fire({
            title: "Error creating assessment",
            icon: "error"
          });
        }
      );
    } else {
      console.error('Form is not valid');
      Swal.fire({
        title: "A Form is not valid",
        icon: "error"
      });
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  navigateToQuestions(assID: number) {
    const storedSubjectID = localStorage.getItem('classid');
    // Store the subjectID in localStorage
    localStorage.setItem('assid', assID.toString());

    // Navigate to the modules page
    // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'assess', 'question', assID]);
  }

}
