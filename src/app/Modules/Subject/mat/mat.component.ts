import { CommonModule, ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mat',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mat.component.html',
  styleUrl: './mat.component.css'
})

export class MatComponent implements OnInit{

  isLoading: boolean = false; // This controls the loader visibility

  subjectID: number | null = null;
  moduleID: any;
  assess:any;
  assessment: any;
  moduleTitle: any;
  LessonDetails:any;
  storedSubjectID:any;
  lessons:any;
  selectLessonID:any;

  constructor(
    private apiService: ApiserviceService, 
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private viewportScroller: ViewportScroller
  ) {}

  createAssessment = new FormGroup({
    title: new FormControl(null),
    lesson_id: new FormControl(null),
    instruction: new FormControl(null),
    description: new FormControl(null),
    due_date: new FormControl(null)
  })

  isModalOpen2 = false;

  ngOnInit(): void {
    this.loadMaterials();
    // Retrieve the subjectID from localStorage
    this.loadAssessments();
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

        // After getting lessons, map assessments to each lesson
        this.lessons.forEach((lesson: any) => {
          lesson.filteredAssessments = this.assess.filter(
            (a: any) => a.lesson_id === lesson.lesson_id
          );
        });
      });
      console.log('Retrieved Subject ID from localStorage:', this.subjectID);
    } else {
      console.error('No subjectID found in localStorage.');
    }
    this.route.fragment.subscribe((fragment: any) => {
      if (fragment) {
          this.viewportScroller.scrollToAnchor(fragment);
      }
  });
  }

  loadMaterials() {
    this.isLoading = true; // Show the loader before the data is loaded

    // Simulate data fetching (you can replace this with an actual service call)
    setTimeout(() => {
      this.isLoading = false; // Hide the loader after data is fetched
    }, 1000); // Simulated delay of 3 seconds
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

  getLessons(id: number) {
    this.apiService.getLessons(id).subscribe(
      (response) => {
        this.lessons = response;   
        this.LessonDetails = response;
        this.cdr.detectChanges();  
        console.log('Lessons Details:', this.LessonDetails);
      },
      (error) => {
        console.error('Error fetching lesson details:', error);
      }
    );
  }

  loadAssessments(){
    this.apiService.getAssessment().subscribe(
      (response: any) => {
        const today = new Date();
        this.assess = response;
        console.log(this.assess);

        this.assess.forEach((assessment: any) => {
          const dueDate = new Date(assessment.Due_date);
          assessment.isOpen = dueDate > today ? true : false; // Close if due date has passed
        });

        this.lessons.forEach((lesson: any) => {
          lesson.filteredAssessments = this.assess.filter(
            (a: any) => a.lesson_id === lesson.lesson_id
          );
        });
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  openModal2() {
    this.isModalOpen2 = true;
  }
  
  closeModal2() {
    this.isModalOpen2 = false;
  }

  toggleDropdown(lesson: any) {
    lesson.isDropdownOpen = !lesson.isDropdownOpen;
  }

  save() {
    if (this.createAssessment.valid) {
      // const data = {
      //   ...this.createAssessment.value
      //   // subjectID: this.subjectID // Include subjectID if needed in your backend
      // };

      this.apiService.createAssess(this.createAssessment.value).subscribe(
        response => {
          console.log('Assessment created:', response);
          Swal.fire({
            title: "Added New Assessment",
            icon: "success"
          });
          this.loadAssessments();
          this.closeModal2(); // Close the modal
          // Optionally, navigate to another page
          // this.router.navigate(['/some-route']);
        },
        error => {
          console.error('Error creating assessment:', error);
          Swal.fire({
            title: "Error creating assessment",
            icon: "error"
          });
        }
      );
    } else {
      console.error('Form is not valid');
      Swal.fire({
        title: "A Form is not valid",
        icon: "error"
      });
    }
  }

  toggleAssessmentStatus(assessment: any) {
    // Check if assessment is closed and needs to be reopened
    if (!assessment.isOpen) {
      // Set a new due date (e.g., one day from today)
      const newDueDate = this.calculateNewDueDate();
  
      // Call the API to update the due date
      this.apiService.updateDueDate(assessment.assessmentID, newDueDate).subscribe(
        (response: any) => {
          console.log(response.message);
          // Update the UI to reflect the change
          assessment.isOpen = true;
          assessment.Due_date = newDueDate;
        },
        (error) => {
          console.error('Error updating due date:', error);
        }
      );
    } else {
      // Logic for closing the assessment (if needed)
      assessment.isOpen = false;
    }
  }
  
  calculateNewDueDate(): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Add 1 day
    return currentDate.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }
  

  navigateToQuestions(assID: number, lessTitle: any) {
    const storedSubjectID = localStorage.getItem('subjectID');
    // Store the subjectID in localStorage
    localStorage.setItem('assid', assID.toString());
    localStorage.setItem('lessTitle', lessTitle);

    // Navigate to the modules page
    // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'assess', 'question', assID]);
  }

  updateLesson(modules_id: any) {
    this.selectLessonID = modules_id;
    console.log('Selected Lesson ID', this.selectLessonID);
    localStorage.setItem('Lesson Id', this.selectLessonID )
    // this.router.navigate(['/main/subject', this.subjectID, 'modules', this.moduleID, 'upadateLesson', lessonID]);
  }

  uploadFile(modules_id: any) {
    this.selectLessonID = modules_id;
    console.log('Selected Lesson ID', this.selectLessonID);
    localStorage.setItem('Lesson Id', this.selectLessonID )
  }
  
  deleteLesson(lesson_id: number) {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure you want to delete this lesson?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      // If user confirms deletion
      if (result.isConfirmed) {
        // Call the delete API
        this.apiService.deleteLesson(lesson_id).subscribe(
          (response) => {
            // Success response handling
            console.log('Lesson deleted:', response);
            // Remove the deleted lesson from the list
            this.lessons = this.lessons.filter((lesson: any) => lesson.lesson_id !== lesson_id);
            this.cdr.detectChanges();
  
            // Show success alert
            Swal.fire({
              title: "Deleted!",
              text: "The lesson has been deleted.",
              icon: "success"
            });
          },
          (error) => {
            // Error response handling
            console.error('Error deleting lesson:', error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the lesson. Please try again.",
              icon: "error"
            });
          }
        );
      }
    });
  }

  deleteAssessment(id: any){
    console.log(id);
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure you want to delete this Assessment?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      // If user confirms deletion
      if (result.isConfirmed) {
        // Call the delete API
        this.apiService.deleteAssessment(id).subscribe(
          (response) => {
            // Success response handling
            console.log('Lesson deleted:', response);
            // Remove the deleted lesson from the list
            this.loadAssessments();
            this.cdr.detectChanges();
  
            // Show success alert
            Swal.fire({
              title: "Deleted!",
              text: "The Assessment has been deleted.",
              icon: "success"
            });
          },
          (error) => {
            // Error response handling
            console.error('Error deleting assessment:', error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the assessment. Please try again.",
              icon: "error"
            });
          }
        );
      }
    });
  }
  

  deleteFile(lesson_id: number) {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure you want to delete this file?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      // If user confirms deletion
      if (result.isConfirmed) {
        // Call the delete API for file deletion
        this.apiService.deleteFile(lesson_id).subscribe(
          (response) => {
            // Success response handling
            console.log('File deleted:', response);
            
            // Find the lesson in the lessons array and set its file property to null
            const lesson = this.lessons.find((lesson: any) => lesson.lesson_id === lesson_id);
            if (lesson) {
              lesson.file = null; // Remove the file content
            }
            this.cdr.detectChanges();  // Manually trigger change detection
  
            // Show success alert
            Swal.fire({
              title: "Deleted!",
              text: "The file has been deleted.",
              icon: "success"
            });
          },
          (error) => {
            // Error response handling
            console.error('Error deleting file:', error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the file. Please try again.",
              icon: "error"
            });
          }
        );
      }
    });
  }  

  deleteMediaFile(mediaId: string) {
    Swal.fire({
      title: "Are you sure you want to delete this file?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      // If user confirms deletion
      if (result.isConfirmed) {
        // Call the delete API for file deletion
        this.apiService.deleteMediaFile(mediaId).subscribe(
          (response) => {
            // Success response handling
            console.log('File deleted:', response);
            // Show success alert
            Swal.fire({
              title: "Deleted!",
              text: "The file has been deleted.",
              icon: "success"
            });
            this.getLessons(this.moduleID);
            this.loadAssessments();
          },
          (error) => {
            // Error response handling
            console.error('Error deleting file:', error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the file. Please try again.",
              icon: "error"
            });
          }
        );
      }
    });
}

}
