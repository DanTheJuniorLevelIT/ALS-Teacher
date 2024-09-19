import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

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

//Working
// export class DiscussionComponent implements OnInit {
  
//   subjectID: number | null = null;
//   moduleID: any;
//   moduleTitle: any;
//   discussuinID: any;
//   discTopic: any;
//   date: any;
//   teacherID: any;
//   discussionForm: FormGroup;
//   discussions: any[] = [];

//   constructor(private fb: FormBuilder, private apiService: ApiserviceService) {
//     this.discussionForm = this.fb.group({
//       answer: ['']
//     });
//   }

//   ngOnInit(): void {
//     const storedSubjectID = localStorage.getItem('subjectID');
//     const storedModuleID = localStorage.getItem('moduleid');
//     const storedModuleTitle = localStorage.getItem('moduletitle');
//     const storedDiscussionID = localStorage.getItem('discussionid');
//     if (storedSubjectID) {
//       this.subjectID = +storedSubjectID;
//       this.moduleID = storedModuleID;
//       this.moduleTitle = storedModuleTitle;
//       this.discussuinID = storedDiscussionID;
//       this.discTopic = localStorage.getItem('disctopic');
//       this.date = localStorage.getItem('date');

//       this.loadDiscussions(this.discussuinID);
//     }
//   }

//   // Load discussion replies
//   loadDiscussions(discussionID: number){
//     this.apiService.viewDiscussionReplies(discussionID).subscribe((data: any) => {
//       this.discussions = data.map((reply: any) => {
//         return {
//           user: reply.lrn ? 'Student' : 'Teacher',
//           date: reply.created_at,
//           answer: reply.reply,
//           role: reply.lrn ? 'student' : 'teacher'
//         };
//       });
//     });
//   }

//   // Submit a new discussion reply
//   submitAnswer(){
//     const newAnswer = this.discussionForm.value.answer;
//     const storedTeacherID = localStorage.getItem('id');

//     // Prepare the payload based on the user role (student or teacher)
//     const payload = {
//       discussionid: this.discussuinID,
//       lrn: null, // If the user is a student, set the learner ID here
//       adminID: storedTeacherID, // Set teacher's admin ID if applicable
//       reply: newAnswer
//     };

//     this.apiService.sendDiscussionReplies(payload).subscribe((response: any) => {
//       this.loadDiscussions(this.discussuinID); // Reload replies after sending a new one
//       this.discussionForm.reset();
//     });
//   }
// }

export class DiscussionComponent implements OnInit {
  
  subjectID: number | null = null;
  moduleID: any;
  moduleTitle: any;
  discussuinID: any;
  discTopic: any;
  date: any;
  teacherID: any;
  discussionForm: FormGroup;
  discussions: any[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiserviceService) {
    this.discussionForm = this.fb.group({
      answer: ['']
    });
  }

  ngOnInit(): void {
    const storedSubjectID = localStorage.getItem('subjectID');
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
    const storedDiscussionID = localStorage.getItem('discussionid');
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID;
      this.moduleID = storedModuleID;
      this.moduleTitle = storedModuleTitle;
      this.discussuinID = storedDiscussionID;
      this.discTopic = localStorage.getItem('disctopic');
      this.date = localStorage.getItem('date');

      this.loadDiscussions(this.discussuinID);
    }
  }

  // Load discussion replies
  //working
  // loadDiscussions(discussionID: number) {
  //   this.apiService.viewDiscussionReplies(discussionID).subscribe((data: any) => {
  //     const groupedDiscussions: any[] = [];

  //     // Group by student-teacher pairs
  //     let currentStudentReply: { user: string; date: any; answer: any; role: string; } | null = null;

  //     data.forEach((reply: any) => {
  //       if (reply.lrn) { // Student reply
  //         if (currentStudentReply) {
  //           groupedDiscussions.push(currentStudentReply); // Push previous student reply
  //           currentStudentReply = null;
  //         }
  //         currentStudentReply = {
  //           user: 'Student',
  //           date: reply.created_at,
  //           answer: reply.reply,
  //           role: 'student'
  //         };
  //       } else { // Teacher reply
  //         if (currentStudentReply) {
  //           groupedDiscussions.push(currentStudentReply); // Push student reply
  //           currentStudentReply = null; // Reset student reply
  //         }
  //         groupedDiscussions.push({
  //           user: 'Teacher',
  //           date: reply.created_at,
  //           answer: reply.reply,
  //           role: 'teacher'
  //         });
  //       }
  //     });

  //     // If there is a student reply left without a teacher reply, add it
  //     if (currentStudentReply) {
  //       groupedDiscussions.push(currentStudentReply);
  //     }

  //     this.discussions = groupedDiscussions;
  //   });
  // }

  loadDiscussions(discussionID: number) {
    this.apiService.viewDiscussionReplies(discussionID).subscribe((data: any) => {
      const groupedDiscussions: any[] = [];
  
      // Group by student-teacher pairs
      let currentStudentReply: { user: string; date: any; answer: any; role: string; } | null = null;
  
      data.forEach((reply: any) => {
        if (reply.lrn) { // Student reply
          if (currentStudentReply) {
            groupedDiscussions.push(currentStudentReply); // Push previous student reply
            currentStudentReply = null;
          }
          currentStudentReply = {
            user: `${reply.student_firstname} ${reply.student_lastname}`, // Student's full name
            date: reply.created_at,
            answer: reply.reply,
            role: 'student'
          };
        } else { // Teacher reply
          if (currentStudentReply) {
            groupedDiscussions.push(currentStudentReply); // Push student reply
            currentStudentReply = null; // Reset student reply
          }
          groupedDiscussions.push({
            user: `${reply.teacher_firstname} ${reply.teacher_lastname}`, // Teacher's full name
            date: reply.created_at,
            answer: reply.reply,
            role: 'teacher'
          });
        }
      });
  
      // If there is a student reply left without a teacher reply, add it
      if (currentStudentReply) {
        groupedDiscussions.push(currentStudentReply);
      }
  
      this.discussions = groupedDiscussions;
    });
  }
  

  // Submit a new discussion reply
  submitAnswer(){
    const newAnswer = this.discussionForm.value.answer;
    const storedTeacherID = localStorage.getItem('id');

    // Prepare the payload based on the user role (student or teacher)
    const payload = {
      discussionid: this.discussuinID,
      lrn: null, // If the user is a student, set the learner ID here
      adminID: storedTeacherID, // Set teacher's admin ID if applicable
      reply: newAnswer
    };

    this.apiService.sendDiscussionReplies(payload).subscribe((response: any) => {
      this.loadDiscussions(this.discussuinID); // Reload replies after sending a new one
      this.discussionForm.reset();
    });
  }
}

