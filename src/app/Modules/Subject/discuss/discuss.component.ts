import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discuss',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './discuss.component.html',
  styleUrl: './discuss.component.css'
})
export class DiscussComponent implements OnInit{

  subjectID: number | null = null;
  moduleID: any;
  moduleTitle: any;
  discuss: any;
  lessons: any;
  assess: any;

  isModalOpen = false;

  createDiscussion = new FormGroup({
    lesson_id: new FormControl(null),
    discussion_topic: new FormControl(null)
  })

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the subjectID from localStorage
    const storedSubjectID = localStorage.getItem('subjectID');
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      this.moduleID = storedModuleID;  // Convert the string to a number
      this.moduleTitle = storedModuleTitle;  // Convert the string to a number
      this.apiService.getLessons(this.moduleID).subscribe((response: any) => {
        this.lessons = response;
        console.log('Lesson: ', this.lessons);
        // After lessons are loaded, load discussions
        this.loadDiscussion();
      });
      console.log('Retrieved Subject ID from localStorage:', this.subjectID);
    } else {
      console.error('No subjectID found in localStorage.');
    }
  }

  loadDiscussion() {
    this.apiService.getDiscussion().subscribe(
      (response: any) => {
        this.discuss = response;
  
        // Now, we will filter the discussions by lesson_id for each lesson
        this.lessons.forEach((lesson: any) => {
          lesson.filteredDiscussions = this.discuss.filter(
            (discussion: any) => discussion.lesson_id === lesson.lesson_id
          );
        });
  
        console.log('Discussions:', this.discuss);
      },
      (error) => {
        console.error('Error fetching discussions:', error);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  save(){
    this.apiService.createDiscussion(this.createDiscussion.value).subscribe((response: any)=>{
      console.log("Discussion Created: ", response)
      Swal.fire({
        title: "Added New Discussion",
        icon: "success"
      });
      this.closeModal();
      this.loadDiscussion();
    })
  }

  navigateToDiscussions(did: any, disctopic: any, date: any) {
    const storedSubjectID = localStorage.getItem('subjectID');
    // Store the subjectID in localStorage
    localStorage.setItem('discussionid', did);
    localStorage.setItem('disctopic', disctopic);
    localStorage.setItem('date', date);

    // Navigate to the modules page
    // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'discuss', did, 'discussion']);
  }

}
