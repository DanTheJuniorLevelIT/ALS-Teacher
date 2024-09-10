import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {

  isModalOpen = false;
  questionText = '';
  questionType = 'multiple-choice'; // Default type
  optionA = '';
  optionB = '';
  optionC = '';
  optionD = '';
  keyAnswer = '';
  points = 0;
  subjectID: number | null = null;
  assessmentID: any;

  students = [
    { name: 'Emma Johnson', completed: true, score: 'No grade yet' },
    { name: 'Liam Smith', completed: true, score: 'No grade yet' },
    { name: 'Olivia Brown', completed: true, score: 'No grade yet' },
    { name: 'Noah Jones', completed: true, score: 'No grade yet' },
    { name: 'Ava Garcia', completed: true, score: 'No grade yet' },
    { name: 'William Miller', completed: true, score: 'No grade yet' },
    { name: 'Sophia Davis', completed: true, score: 'No grade yet' },
    { name: 'James Wilson', completed: true, score: 'No grade yet' },
    { name: 'Isabella Taylor', completed: true, score: 'No grade yet' },
    { name: 'Benjamin Anderson', completed: false, score: 'No grade yet'},
    { name: 'Mia Thomas', completed: false, score: 'No grade yet' },
    { name: 'Lucas Martinez', completed: false, score: 'No grade yet' },
    { name: 'Charlotte Lee', completed: false, score: 'No grade yet' },
    { name: 'Henry White', completed: false, score: 'No grade yet' },
    { name: 'Amelia Harris', completed: false, score: 'No grade yet' },
    { name: 'Alexander Clark', completed: false, score: 'No grade yet' },
    { name: 'Evelyn Lewis', completed: false, score: 'No grade yet' },
    { name: 'Michael Walker', completed: false, score: 'No grade yet' },
    { name: 'Abigail Hall', completed: false, score: 'No grade yet' },
    { name: 'Elijah Scott', completed: false, score: 'No grade yet' },
    { name: 'Emily Young', completed: false, score: 'No grade yet' },
    { name: 'Daniel Hernandez', completed: false, score: 'No grade yet' },
    { name: 'Harper King', completed: false, score: 'No grade yet' },
    { name: 'Matthew Robinson', completed: false, score: 'No grade yet' },
    { name: 'Ella Wright', completed: false, score: 0 }
];

ngOnInit(): void {
  // Retrieve the subjectID from localStorage
  const storedSubjectID = localStorage.getItem('subjectID');
  const storedAssessmentID = localStorage.getItem('assid');
  if (storedSubjectID) {
    this.subjectID = +storedSubjectID;  // Convert the string to a number
    this.assessmentID = storedAssessmentID;  // Convert the string to a number
    console.log('Retrieved Subject ID from localStorage:', this.assessmentID);
  } else {
    console.error('No subjectID found in localStorage.');
  }
}


autoCheck() {
  this.students.forEach(student => {
      if (student.completed) {
        student.score = 10;
          // student.score = Math.floor(Math.random() * 10) + 1;
      } else {
          student.score = 'No grade yet';
      }
  });
}


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

onQuestionTypeChange(): void {
  // Reset keyAnswer when changing the type of question
  this.keyAnswer = '';
}

addQuestion(): void {
  // Handle adding the question logic here
  console.log('Question:', this.questionText);
  console.log('Type of Question:', this.questionType);
  console.log('Options:', {
    A: this.optionA,
    B: this.optionB,
    C: this.optionC,
    D: this.optionD
  });
  console.log('Key Answer:', this.keyAnswer);
  console.log('Points:', this.points);

  // Implement the logic to add the question to the system

  this.closeModal();
}

}
