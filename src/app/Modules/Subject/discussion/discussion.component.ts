import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
// export class DiscussionComponent {

//   discussionForm!: FormGroup;
//   discussions: any[] = [];
//   isTeacher: boolean = false; // Set this flag based on the user's role

//   constructor(private fb: FormBuilder, private discussionService: DiscussionService) {}


//   ngOnInit(): void {
//     this.discussionForm = this.fb.group({
//       answer: ['']
//     });

//     this.loadDiscussions();
//   }

//   loadDiscussions() {
//     this.discussionService.getDiscussions().subscribe(data => {
//       this.discussions = data;
//     });
//   }

//   submitAnswer() {
//     if (this.discussionForm.valid) {
//       const newAnswer = {
//         answer: this.discussionForm.get('answer')?.value,
//         user: this.isTeacher ? 'Teacher' : 'Student',
//         date: new Date()
//       };

//       this.discussionService.postAnswer(newAnswer).subscribe(() => {
//         this.loadDiscussions();
//         this.discussionForm.reset();
//       });
//     }
//   }

// }

// export class DiscussionComponent implements OnInit {
//   discussionForm!: FormGroup;
//   discussions: any[] = [];
//   isTeacher: boolean = false; // Set this flag based on the user's role

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.discussionForm = this.fb.group({
//       answer: ['']
//     });

//     // Load mock discussions
//     this.discussions = [
//       {
//         user: 'Teacher',
//         date: new Date('2024-06-12T09:00:00'),
//         answer: 'Hello ALS Learners this is our topic for discussion today. Share your thoughts about this topic. Lets begin.'
//       },
//       {
//         user: 'Student',
//         date: new Date('2024-06-12T10:00:00'),
//         answer: 'Swallowed blood can irritate your stomach and cause vomiting. And vomiting may make the bleeding worse or cause it to start again. Spit out any blood that gathers in your mouth and throat rather than swallowing it. Use your thumb and forefinger to firmly pinch the soft part of your nose shut.'
//       }
//     ];
//   }

//   submitAnswer() {
//     if (this.discussionForm.valid) {
//       const newAnswer = {
//         answer: this.discussionForm.get('answer')?.value,
//         user: this.isTeacher ? 'Student' : 'Teacher',
//         date: new Date()
//       };

//       this.discussions.push(newAnswer);
//       this.discussionForm.reset();
//     }
//   }
// }

export class DiscussionComponent implements OnInit {
  discussionForm: FormGroup;
  discussions: { user: string, date: Date, answer: string, role: string }[] = [
    { user: 'Teacher', date: new Date(), answer: 'Hello ALS Learners this is our topic for discussion today. Share your thoughts about this topic. Lets begin.', role: 'teacher' },
    { user: 'Student', date: new Date(), answer: 'For me, swallowed blood can irritate your stomach and cause vomiting. And vomiting may make the bleeding worse or cause it to start again. Spit out any blood that gathers in your mouth and throat rather than swallowing it. Use your thumb and forefinger to firmly pinch the soft part of your nose shut.', role: 'student' }
  ];

  constructor(private fb: FormBuilder) {
    this.discussionForm = this.fb.group({
      answer: ['']
    });
  }

  ngOnInit() {}

  submitAnswer() {
    const newAnswer = this.discussionForm.value.answer;
    const newDiscussion = {
      user: 'Teacher',
      date: new Date(),
      answer: newAnswer,
      role: 'teacher' // or 'teacher' based on who is replying
    };
    this.discussions.push(newDiscussion);
    this.discussionForm.reset();
  }
}
