import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {

  isModalOpen = false;
  questionText = '';
  questionType = 'multiple-choice'; // Default type
  optionA = '';
  optionB = '';
  optionC = '';
  optionD = '';
  keyAnswer = '';
  points = 0;

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
