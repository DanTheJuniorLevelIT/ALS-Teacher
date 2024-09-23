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

  qid: any;
  res: any;

  subjectID: number | null = null;
  assessmentID: any;
  moduleID: any;
  det: any;
  questions: any;


  identify: any;
  tf: any;
  essay: any;
  mc: any;

  completedCount: number = 0;
  totalStudents: number = 0;

  isModalOpen = false;
  isEditing = false; // To track if we are in edit mode
  selectedQuestion: any = null; 
  questionText = '';
  questionType = 'multiple-choice'; // Default type
  options: { text: string }[] = [];
  optionLabels: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']  // Start with one option input
  keyAnswer = '';
  points = 1;
  Object: any;

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
    this.options.push({ text: '' });
    // Retrieve the subjectID from localStorage
    const storedSubjectID = localStorage.getItem('subjectID');
    const storedAssessmentID = localStorage.getItem('assid');
    const storedModuleID = localStorage.getItem('moduleid');
    if (storedSubjectID) {
      this.moduleID = storedModuleID;
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      this.assessmentID = storedAssessmentID;
      this.loadQuestions();
      this.loadCompletion(); 
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

  // Function to add an empty option field
  addOption() {
    // Ensure that we don't add more than the available labels (e.g., A to G)
    if (this.options.length < this.optionLabels.length) {
        this.options.push({ text: '' }); // Add a new empty option to the array
    }
  }

  loadQuestions(){
    this.apiService.getQuestion(this.assessmentID).subscribe((response: any) => {
      if (response.data && Array.isArray(response.data)) {
        this.questions = response.data;  // Access the data array in the response
        this.filteredQuestionTypes();
        console.log(this.questions);
      } else {
        console.error('Unexpected response structure:', response);
      }
    });
  }

  filteredQuestionTypes(){
    this.identify = this.questions.filter((typ: { type: string; }) => typ.type == 'identification');
    this.tf = this.questions.filter((typ: { type: string; })=> typ.type == 'true-false');
    this.essay = this.questions.filter((typ: { type: string; }) => typ.type == 'Essay');
    this.mc = this.questions.filter((typ: { type: string; }) => typ.type == 'multiple-choice');
  }

  loadCompletion(){
    this.apiService.getCompletionStats(this.assessmentID).subscribe((stats: any) => {
      this.completedCount = stats.completed;
      this.totalStudents = stats.total;
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
  
    if (this.questionType === 'multiple-choice') {
      this.options = this.selectedQuestion.options.map((opt: any) => ({ text: opt }));  // Populate options array
    } else {
      this.options = [{ text: '' }];  // Reset options if not multiple-choice
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

addQuestion() {

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
    if (this.questionType === 'multiple-choice' && this.getOptions().length < 2) {
      alert('Please enter at least two valid options.');
      return;
    }    
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
}

deleteQuestion(){
  this.qid = this.selectedQuestion.question_id;
  console.log('Question ID: ',this.qid);

  this.apiService.deleteQuestion(this.qid).subscribe((response: any)=>{
    this.res = response.status;
    console.log('Message: ', this.res);
    this.loadQuestions();
    this.closeModal();
  })
}

resetForm() {
  this.questionText = '';
  this.questionType = 'multiple-choice';
  this.options = [{ text: '' }];  // Reset to one empty option
  this.keyAnswer = '';
  this.points = 1;
  this.isEditing = false;
  this.selectedQuestion = null;
}

getOptions() {
  if (this.questionType === 'multiple-choice') {
    return this.options.map(option => option.text).filter(text => text.trim() !== '');
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
