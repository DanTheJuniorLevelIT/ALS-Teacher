import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

@Component({
  selector: 'app-mat',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './mat.component.html',
  styleUrl: './mat.component.css'
})
// export class MatComponent {

//   isModalOpen = false;

//   openModal() {
//     this.isModalOpen = true;
//   }

//   closeModal() {
//     this.isModalOpen = false;
//   }
  
// }

export class MatComponent implements OnInit{

  subjectID: number | null = null;
  moduleID: any;

  constructor(
    private apiserv: ApiserviceService, 
    private route: ActivatedRoute, 
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  isModalOpen = false;
  newLessonTitle = '';
  newLessonName = '';
  newLessonDesc = '';
  newLessonHandout = '';
  lessons = [
    {
      title: 'Nosebleeds, Swallowing Objects, Poisoning and Dog Bites',
      name: 'Lesson 1',
      desc: 'Accidents happen at any time and at any place. How can you be sure that you are safe inside or outside your house? Study the pictures on the left. What do you see in them? If you happen to get injured and there is no doctor around, what should you do?',
      isDropdownOpen: false
    },
    {
      title: 'Sprains, Dislocations and Fractures',
      name: 'Lesson 2',
      desc: 'Accidents and hard physical activities can sometimes lead to bone and other injuries. These injuries can happen anywhere - even at home. It is best that you know how to give immediate treatment for injuries like sprains, dislocations and fractures.',
      isDropdownOpen: false
    }
  ];


  ngOnInit(): void {
    // Retrieve the subjectID from localStorage
    const storedSubjectID = localStorage.getItem('subjectID');
    const storedModuleID = localStorage.getItem('moduleid');
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      this.moduleID = storedModuleID;  // Convert the string to a number
      console.log('Retrieved Subject ID from localStorage:', this.subjectID);
    } else {
      console.error('No subjectID found in localStorage.');
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleDropdown(lesson: any) {
    lesson.isDropdownOpen = !lesson.isDropdownOpen;
  }

  updateLesson(lesson: any) {
    // Code to update the lesson
    alert('Update lesson: ' + lesson.name);
  }

  uploadFile(lesson: any) {
    // Code to upload the file
    alert('Upload file for lesson: ' + lesson.name);
  }

  deleteLesson(lesson: any) {
    // Code to delete the lesson
    this.lessons = this.lessons.filter(l => l !== lesson);
    alert('Deleted lesson: ' + lesson.name);
  }

  addLesson() {
    const newLesson = {
      title: this.newLessonTitle,
      name: this.newLessonName,
      desc: this.newLessonDesc,
      isDropdownOpen: false
    };
    this.lessons.push(newLesson);
    this.closeModal();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Handle the selected file
      console.log('Selected file:', file.name);
    }
  }
}
