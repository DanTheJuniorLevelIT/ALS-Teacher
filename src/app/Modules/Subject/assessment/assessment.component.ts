import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

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
    const storedSubjectID = localStorage.getItem('subjectID');
    const token = localStorage.getItem('authToken');
    this.authtoken = token;
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      this.moduleID = storedModuleID;
      this.moduleTitle = storedModuleTitle;  // Convert the string to a number  // Convert the string to a number
      console.log('Retrieved Subject ID from localStorage:', this.subjectID);
    } else {
      console.error('No subjectID found in localStorage.');
    }

    this.apiService.getAssessment().subscribe(
      (response) => {
        this.assess = response;
        console.log(this.assess);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // save(){
  //   console.log(this.createAssessment.value);
  // }

  save() {
    if (this.createAssessment.valid) {
      // const data = {
      //   ...this.createAssessment.value
      //   // subjectID: this.subjectID // Include subjectID if needed in your backend
      // };

      this.apiService.createAssess(this.createAssessment.value).subscribe(
        response => {
          console.log('Assessment created:', response);
          this.closeModal(); // Close the modal
          // Optionally, navigate to another page
          // this.router.navigate(['/some-route']);
        },
        error => {
          console.error('Error creating assessment:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  navigateToQuestions(assID: number) {
    const storedSubjectID = localStorage.getItem('subjectID');
    // Store the subjectID in localStorage
    localStorage.setItem('assid', assID.toString());

    // Navigate to the modules page
    // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', 'assess', 'question', assID]);
  }

}
