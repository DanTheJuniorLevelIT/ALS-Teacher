import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './check.component.html',
  styleUrl: './check.component.css'
})
export class CheckComponent implements OnInit {
  // checkForm!: FormGroup;
  subjectID: number | null = null;
  totalScore: number = 0;
  maxScore: number = 0;
  assessmentID: any;
  moduleID: any;
  learnerID: any;
  questions: any;
  studentAnswers: any;
  det: any

  constructor(private apiserv: ApiserviceService) {}

  isTeacher: boolean = true;

  ngOnInit(): void {
    // Retrieve the subjectID from localStorage
    const storedSubjectID = localStorage.getItem('subjectID');
      const storedAssessmentID = localStorage.getItem('assid');
      const storedModuleID = localStorage.getItem('moduleid');
      const storedLearnerID = localStorage.getItem('lrn');
      if (storedSubjectID) {
        this.moduleID = storedModuleID;
        this.subjectID = +storedSubjectID;  // Convert the string to a number
        this.assessmentID = storedAssessmentID;
        this.learnerID = storedLearnerID;
        this.loadStudentAnswers(this.assessmentID, this.learnerID);
      console.log('Retrieved Assessment ID from localStorage:', this.assessmentID);
    } else {
      console.error('No subjectID found in localStorage.');
    }

    this.apiserv.getAssessmentDetails(this.assessmentID).subscribe((response: any)=>{
      this.det = response
      console.log(this.det);
    });
  }

  loadStudentAnswers(assessmentId: number, lrn: string) {
    this.apiserv.getStudentAnswers(assessmentId, lrn).subscribe((response: any) => {
      if (response.status === 'success') {
        this.studentAnswers = response.data;
        this.totalScore = response.total_score;
        this.maxScore = response.max_score;
        console.log('student answers: ', this.studentAnswers);
      } else {
        console.error('Failed to load student answers');
      }
    });
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);  // Converts 0 -> 'A', 1 -> 'B', etc.
  }

  

}
