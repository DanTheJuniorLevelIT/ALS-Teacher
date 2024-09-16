import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { response } from 'express';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit{

  subjectID: number | null = null;
  assessmentID: any;
  moduleID: any;
  det: any;
  questions: any;

  isModalOpen = false;
  isEditing = false; // To track if we are in edit mode
  selectedQuestion: any = null; 
  questionText = '';
  questionType = 'multiple-choice'; // Default type
  optionA = '';
  optionB = '';
  optionC = '';
  optionD = '';
  keyAnswer = '';
  points = 1;

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the subjectID from localStorage
    const storedSubjectID = localStorage.getItem('subjectID');
    const storedAssessmentID = localStorage.getItem('assid');
    const storedModuleID = localStorage.getItem('moduleid');
    if (storedSubjectID) {
      this.moduleID = storedModuleID;
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      this.assessmentID = storedAssessmentID;
      this.loadQuestions();  // Convert the string to a number
      console.log('Retrieved Subject ID from localStorage:', this.assessmentID);
    } else {
      console.error('No subjectID found in localStorage.');
    }

    // this.apiService.getQuestion(this.assessmentID).subscribe((response: any)=>{
    //   this.questions = response
    //   console.log(this.questions);
    // })
    

    this.apiService.getAssessmentDetails(this.assessmentID).subscribe((response: any)=>{
      this.det = response
      console.log(this.det);
    });
  }

  loadQuestions(){
    this.apiService.getQuestion(this.assessmentID).subscribe((response: any) => {
      if (response.data && Array.isArray(response.data)) {
        this.questions = response.data;  // Access the data array in the response
      } else {
        console.error('Unexpected response structure:', response);
      }
    });
  }

  // editQuestion(id: any){
    
  // }

  editQuestion(id: any) {
    this.isEditing = true;
    this.selectedQuestion = this.questions.find((q: any) => q.question_id === id);

    // Pre-fill the form fields with selected question data
    this.questionText = this.selectedQuestion.question;
    this.questionType = this.selectedQuestion.type;
    this.keyAnswer = this.selectedQuestion.key_answer;
    this.points = this.selectedQuestion.points;

    // Pre-fill options if it's a multiple-choice question
    if (this.questionType === 'multiple-choice') {
      const options = this.selectedQuestion.options || [];
      this.optionA = options[0] || '';
      this.optionB = options[1] || '';
      this.optionC = options[2] || '';
      this.optionD = options[3] || '';
    } else {
      this.optionA = '';
      this.optionB = '';
      this.optionC = '';
      this.optionD = '';
    }

    this.openModal();
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 is the char code for 'A'
  }


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

onQuestionTypeChange(): void {
  // Reset keyAnswer when changing the type of question
  this.keyAnswer = '';
}

// addQuestion() {
//   const questionPayload = {
//     assessment_id: this.assessmentID,
//     question: this.questionText,
//     type: this.questionType,
//     key_answer: this.keyAnswer,
//     points: this.points,
//     options: this.getOptions() // Get options if multiple-choice question
//   };

//   console.log(questionPayload);

//   this.apiService.createQuestion(questionPayload).subscribe(
//     (response: any) => {
//       console.log('Question added successfully', response);
//       this.closeModal();
//     },
//     (error) => {
//       console.error('Error adding question', error);
//     }
//   );
// }

addQuestion() {
  // const questionPayload = {
  //   assessment_id: this.assessmentID,
  //   question: this.questionText,
  //   type: this.questionType,
  //   key_answer: this.keyAnswer,
  //   points: this.points,
  //   options: this.getOptions() // Get options if multiple-choice question
  // };

  const questionPayload = {
    question_id: this.isEditing ? this.selectedQuestion.question_id : null,
    assessment_id: this.assessmentID,
    question: this.questionText,
    type: this.questionType,
    key_answer: this.keyAnswer,
    points: this.points,
    options: this.getOptions()
  };

  if (this.isEditing) {
    // Update existing question
    this.apiService.editQuestion(questionPayload).subscribe(
      (response: any) => {
        this.loadQuestions();
        this.closeModal();
      },
      error => {
        console.error('Error updating question', error);
      }
    );
  } else {
    // Add new question
    this.apiService.createQuestion(questionPayload).subscribe(
      (response: any) => {
        const newQuestion = {
          question_id: response.question.question_id,
          question: response.question.question,
          type: response.question.type,
          key_answer: response.question.key_answer,
          points: response.question.points,
          options: response.question.options || []
        };
        // this.questions.push(newQuestion);
        this.loadQuestions();
        this.closeModal();
      },
      error => {
        console.error('Error adding question', error);
      }
    );
  }

  // console.log(questionPayload);

  // this.apiService.createQuestion(questionPayload).subscribe(
  //   (response: any) => {
  //     console.log('Question added successfully', response);

  //     // Add the newly created question to the local questions array
  //     const newQuestion = {
  //       question_id: response.question.question_id,
  //       question: response.question.question,
  //       type: response.question.type,
  //       key_answer: response.question.key_answer,
  //       points: response.question.points,
  //       options: response.question.options || []
  //     };
  //     this.questions.push(newQuestion);  // Update the questions array

  //     // Close the modal and reset form inputs
  //     this.closeModal();
  //     this.resetForm();
  //   },
  //   (error) => {
  //     console.error('Error adding question', error);
  //   }
  // );
}

resetForm() {
  this.questionText = '';
  this.questionType = 'multiple-choice';
  this.optionA = '';
  this.optionB = '';
  this.optionC = '';
  this.optionD = '';
  this.keyAnswer = '';
  this.points = 1;
  this.isEditing = false;
  this.selectedQuestion = null;
}

getOptions() {
  if (this.questionType === 'multiple-choice') {
    return [this.optionA, this.optionB, this.optionC, this.optionD].filter(option => option);
  }
  return [];
}

navigateToProgress() {
  const storedSubjectID = localStorage.getItem('subjectID');
  const storedAssessmentID = localStorage.getItem('assid');
  // Store the subjectID in localStorage

  // Navigate to the modules page
  // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
  this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'assess', 'question', storedAssessmentID, 'progress']);
}


}
