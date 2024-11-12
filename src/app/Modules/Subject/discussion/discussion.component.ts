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
export class DiscussionComponent implements OnInit {
  
  subjectID: number | null = null;
  moduleID: any;
  moduleTitle: any;
  lessonTitle: any;
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
    this.lessonTitle = localStorage.getItem('lessTitle');
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

  transformText(text: string): string {
    // Split text into paragraphs by double newlines or line breaks
    let paragraphs = text.split(/\n\s*\n/);
  
    // For each paragraph, add <p> tags, and within each paragraph add <br> after each period
    return paragraphs
      .map(paragraph => paragraph.replace(/\.\s*/g, '.<br>')) // Add <br> after each period
      .map(paragraph => `<p>${paragraph}</p>`) // Wrap each transformed paragraph in <p> tags
      .join(''); // Join all paragraphs together
  }

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

