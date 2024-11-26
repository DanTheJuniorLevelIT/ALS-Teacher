import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import Swal from 'sweetalert2'

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

  ClassID: number | null = null;
  lessonTitle: any;
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
    // Retrieve the ClassID from localStorage
    this.lessonTitle = localStorage.getItem('lessTitle');
    const storedClassID = localStorage.getItem('classid');
    const storedAssessmentID = localStorage.getItem('assid');
    const storedModuleID = localStorage.getItem('moduleid');
    if (storedClassID) {
      this.moduleID = storedModuleID;
      this.ClassID = +storedClassID;  // Convert the string to a number
      this.assessmentID = storedAssessmentID;
      this.loadQuestions();
      this.loadCompletion(); 
      console.log('Retrieved Subject ID from localStorage:', this.assessmentID);
    } else {
      console.error('No ClassID found in localStorage.');
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

  setKeyAnswer(optionText: string) {
    this.keyAnswer = optionText;
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
    this.apiService.getCompletionStats(this.assessmentID, this.ClassID).subscribe((stats: any) => {
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
    // Set keyAnswer based on question type
    if (this.questionType === 'essay') {
      this.keyAnswer = '';  // Key answer is not required for essay type
    } else {
      this.keyAnswer = this.selectedQuestion.key_answer;  // Use the key answer for other types
    }
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
    key_answer: this.questionType !== 'Essay' ? this.keyAnswer : null, // Don't send key_answer for essay
    points: this.points,
    options: this.getOptions()
  };

  if (this.isEditing) {
    // Update existing question
    this.apiService.editQuestion(questionPayload).subscribe(
      (response: any) => {
        Swal.fire({
          title: "Updated Question",
          icon: "success"
        });
        this.loadQuestions();
        this.closeModal();
      },
      error => {
        console.error('Error updating question', error);
        Swal.fire({
          title: "Error Updating Question",
          icon: "error"
        });
      }
    );
  } else {
    if (this.questionType === 'multiple-choice' && this.getOptions().length < 2) {
      // alert('Please enter at least two valid options.');
      Swal.fire({
        title: "Please enter at least two valid options.",
        icon: "warning"
      });
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
        Swal.fire({
          title: "Added New Question",
          icon: "success"
        });
        // this.questions.push(newQuestion);
        this.loadQuestions();
        this.closeModal();
      },
      error => {
        console.error('Error adding question', error);
        Swal.fire({
          title: "Error adding question",
          icon: "error"
        });
      }
    );
  }
}

deleteQuestion(){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.qid = this.selectedQuestion.question_id;
      console.log('Question ID: ',this.qid);

      this.apiService.deleteQuestion(this.qid).subscribe((response: any)=>{
        this.res = response.status;
        console.log('Message: ', this.res);
        this.loadQuestions();
        this.closeModal();
      })
    }
  });
  // this.qid = this.selectedQuestion.question_id;
  // console.log('Question ID: ',this.qid);

  // this.apiService.deleteQuestion(this.qid).subscribe((response: any)=>{
  //   this.res = response.status;
  //   console.log('Message: ', this.res);
  //   this.loadQuestions();
  //   this.closeModal();
  // })
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

navigateToProgress(title: any) {
  localStorage.setItem('assessTitle', title);
  const storedClassID = localStorage.getItem('classid');
  const storedAssessmentID = localStorage.getItem('assid');
  // Store the ClassID in localStorage

  // Navigate to the modules page
  // this.route.navigate(['/main/Subject/main/subject/modulesmain', ClassID, 'modules']);
  this.router.navigate(['/main/Subject/main/subject/modulesmain', storedClassID, 'modules', this.moduleID, 'assess', 'question', storedAssessmentID, 'progress']);
}


}
