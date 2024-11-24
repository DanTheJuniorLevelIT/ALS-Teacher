import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileNamePipe } from '../../../file-name.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewfile',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, FileNamePipe],
  templateUrl: './viewfile.component.html',
  styleUrl: './viewfile.component.css'
})
export class ViewfileComponent implements OnInit {

  fname: any;
  lname: any;
  // checkForm!: FormGroup;
  subjectID: number | null = null;
  aid: any;
  studScore: any;
  totalScore: number = 0;
  maxScore: number = 0;
  assessmentID: any;
  moduleID: any;
  learnerID: any;
  questions: any;
  studentAnswers: any;
  studentScores: any;
  studentFile: any;
  det: any

  constructor(private apiserv: ApiserviceService, private sanitizer: DomSanitizer) {}

  isTeacher: boolean = true;

  ngOnInit(): void {
    const first = localStorage.getItem('fname');
    const last = localStorage.getItem('lname');
    this.fname = first;
    this.lname = last;
    // Retrieve the subjectID from localStorage
    const storedSubjectID = localStorage.getItem('classid');
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
        this.studScore = response.studentScore;
        this.studentScores = response.scores;
        this.maxScore = response.max_score;
        this.studentFile = response.studentFile;
        this.aid = response.answerid;
        console.log('student Answer ID: ', this.aid);
        console.log('student File: ', this.studentFile);
        console.log('student answers: ', this.studentAnswers);
        console.log('student scores: ', this.studentScores);
        console.log('student Total Score: ', this.studScore);
      } else {
        console.error('Failed to load student answers');
      }
    });
  }

  // View file in a new tab
  viewFile(fileUrl: string) {
    const fullFilePath = this.apiserv.getBaseUrl() + 'storage/Files/' + fileUrl;
    if (fileUrl.endsWith('.pdf')) {
      window.open(fullFilePath as string, '_blank'); // Open PDFs in a new tab
    } else {
      const link = document.createElement('a');
      link.href = fullFilePath;
      link.download = fileUrl.split('/').pop() || 'downloaded-file';
      link.click(); // Trigger download for other files
    }
  }
  

  // Download file
  // downloadFile(fileUrl: string) {
  //   const link = document.createElement('a');
  //   link.href = this.apiserv.getBaseUrl() + 'storage/Files/' + fileUrl;
  //   link.download = fileUrl.split('/').pop() || 'downloaded-file';
  //   link.click();
  // }

  //working
  manualCheck(score: number) {
    const payload = {
      assessment_id: this.assessmentID,
      learner_id: this.learnerID,
      answerid: this.aid,
      score: score  // Only add this to essay questions
    };
  
    // Call API to submit the score
    this.apiserv.updateScore(payload).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          // console.log('Essay score added successfully');
          Swal.fire({
            title: "Updated Score",
            icon: "success"
          });
          this.totalScore = response.total_score;  // Update total score
          this.loadStudentAnswers(this.assessmentID, this.learnerID);  // Reload answers to refresh the scores
        } else {
          console.error('Failed to add score');
        }
      },
      (error) => {
        console.error('Error adding score', error);
      }
    );
  }
}
