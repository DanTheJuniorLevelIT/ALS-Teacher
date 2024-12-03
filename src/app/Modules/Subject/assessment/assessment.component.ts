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

  classID: number | null = null;
  authtoken: any;
  moduleID: any;
  moduleTitle: any;
  
  lessons:any;
  lesson: any;
  LessonDetails: any;
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
    // Retrieve the classID from localStorage
    const storedClasstID = localStorage.getItem('classid');
    const token = localStorage.getItem('authToken');
    this.authtoken = token;
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
    if (storedClasstID) {
      this.classID = +storedClasstID;  // Convert the string to a number
      this.moduleID = storedModuleID;
      this.moduleTitle = storedModuleTitle;  // Convert the string to a number  // Convert the string to a number
      this.loadAssessments(this.classID);
      console.log('Retrieved Subject ID from localStorage:', this.classID);
    } else {
      console.error('No classID found in localStorage.');
    }

    
  }

  loadAssessments(cid: any){
    this.apiService.getAssessmentsByClass(cid).subscribe((response: any)=>{
      this.assess = response;
      console.log(this.assess)
    })
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  navigateToQuestions(assID: number, lessTitle: any) {
    const storedSubjectID = localStorage.getItem('classid');
    // Store the subjectID in localStorage
    localStorage.setItem('assid', assID.toString());
    localStorage.setItem('lessTitle', lessTitle);

    // Navigate to the modules page
    // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'assess', 'question', assID]);
  }

}
