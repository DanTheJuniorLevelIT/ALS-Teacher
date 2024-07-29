import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './check.component.html',
  styleUrl: './check.component.css'
})
export class CheckComponent implements OnInit {
  checkForm!: FormGroup;
  correctAnswers: { [key: string]: string } = {
    q1: 'true',
    q2: 'true',
    q3: 'true',
    q4: 'false',
    q5: 'false',
    q6: 'false',
    q7: 'true',
    q8: 'false',
    q9: 'true',
    q10: 'true'
  };
  score: number = 0;

  constructor(private fb: FormBuilder) {}

  // ngOnInit(): void {
  //   this.checkForm = this.fb.group({
  //     q1: ['true'],
  //     q2: ['true'],
  //     q3: ['true'],
  //     q4: ['false'],
  //     q5: ['false'],
  //     q6: ['false'],
  //     q7: ['true'],
  //     q8: ['false'],
  //     q9: ['true'],
  //     q10: ['true']
  //   });

  //   this.calculateScore();
  //   this.checkForm.valueChanges.subscribe(() => this.calculateScore());
  // }

  isTeacher: boolean = true;

  ngOnInit(): void {
    this.checkForm = this.fb.group({
      q1: [{ value: 'true', disabled: this.isTeacher }],
      q2: [{ value: 'true', disabled: this.isTeacher }],
      q3: [{ value: 'true', disabled: this.isTeacher }],
      q4: [{ value: 'false', disabled: this.isTeacher }],
      q5: [{ value: 'false', disabled: this.isTeacher }],
      q6: [{ value: 'false', disabled: this.isTeacher }],
      q7: [{ value: 'true', disabled: this.isTeacher }],
      q8: [{ value: 'false', disabled: this.isTeacher }],
      q9: [{ value: 'true', disabled: this.isTeacher }],
      q10: [{ value: 'true', disabled: this.isTeacher }]
    });

    this.calculateScore();
    this.checkForm.valueChanges.subscribe(() => this.calculateScore());
  }

  calculateScore(): void {
    this.score = Object.keys(this.correctAnswers).reduce((acc, key) => {
      return acc + (this.checkForm.get(key)?.value === this.correctAnswers[key] ? 1 : 0);
    }, 0);
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-check',
//   standalone: true,
//   imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
//   templateUrl: './check.component.html',
//   styleUrls: ['./check.component.css']
// })
// export class CheckComponent implements OnInit {
//   checkForm!: FormGroup;
//   correctAnswers: { [key: string]: string } = {
//     q1: 'true',
//     q2: 'true',
//     q3: 'true',
//     q4: 'false',
//     q5: 'false',
//     q6: 'false',
//     q7: 'true',
//     q8: 'false',
//     q9: 'true',
//     q10: 'true'
//   };
//   score: number = 0;
//   questionList = [
//     { text: 'A sudden twist or pulling of the bone causes a dislocated joint.' },
//     { text: 'An X-ray can show how serious a fracture is.' },
//     { text: 'A rolled newspaper or a piece of cardboard can be used in making a splint.' },
//     { text: 'Objects that are lodged in the throat should be pulled out using the fingers.' },
//     { text: 'A dog that has bitten a person should be killed immediately.' },
//     { text: 'A person who has swallowed gas or petroleum should be made to vomit.' },
//     { text: 'Keeping the sprained part elevated above the level of your heart will help reduce the swelling.' },
//     { text: 'The splint used in any kind of fracture should be tight.' },
//     { text: 'A person with a broken bone should not be made to move.' },
//     { text: 'One way of stopping a nosebleed is to put ice or a cold towel on the forehead.' }
//   ];

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.checkForm = this.fb.group({
//       q1: ['true'],
//       q2: ['true'],
//       q3: ['true'],
//       q4: ['false'],
//       q5: ['false'],
//       q6: ['false'],
//       q7: ['true'],
//       q8: ['false'],
//       q9: ['true'],
//       q10: ['true']
//     });

//     this.calculateScore();
//     this.checkForm.valueChanges.subscribe(() => this.calculateScore());
//   }

//   calculateScore(): void {
//     this.score = Object.keys(this.correctAnswers).reduce((acc, key) => {
//       return acc + (this.checkForm.get(key)?.value === this.correctAnswers[key] ? 1 : 0);
//     }, 0);
//   }

//   manualCheck(questionKey: string, isCorrect: boolean): void {
//     if (isCorrect) {
//       this.checkForm.get(questionKey)?.setValue(this.correctAnswers[questionKey]);
//     } else {
//       this.checkForm.get(questionKey)?.setValue(this.correctAnswers[questionKey] === 'true' ? 'false' : 'true');
//     }
//     this.calculateScore();
//   }
// }
