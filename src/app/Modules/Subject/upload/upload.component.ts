import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [RouterModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule,ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})


export class UploadComponent implements OnInit{
  constructor(
    private apiserv: ApiserviceService, 
    private router: Router, 
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}
  lesson_id = localStorage.getItem('Lesson ID');

  lessons:any;
  subjectID: number | null = null;
  moduleID: any;
  moduleTitle: any;
  LessonDetails:any;
  storedSubjectID:any;
  selectLessonID:any;
  lessonId:any;
  selectedFile: File | null = null;


  ngOnInit(): void {
    const lesson_id = localStorage.getItem('Lesson Id');
    this.lessonId = localStorage.getItem('Lesson Id');
    console.log('lesson',lesson_id)
    console.log('Lesson ID:', this.lessonId); 
    const storedSubjectID = localStorage.getItem('subjectID');
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
    
    // Retrieve the subjectID from localStorage
 
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      this.moduleID = storedModuleID;  // Convert the string to a number
      this.moduleTitle = storedModuleTitle;  // Convert the string to a number
      this.getLessons(this.lessonId);
      console.log('Retrieved Subject ID from localStorage:', this.subjectID);
    } else {
      console.error('No subjectID found in localStorage.');
    }
  }

  getLessons(id: number) {
    this.apiserv.getLesson(id).subscribe(
      (response) => {
        this.lessons = response;   
        this.LessonDetails = response;
        this.cdr.detectChanges();  // Manually trigger change detection
        console.log('Lessons Details:', this.LessonDetails);
      },
      (error) => {
        console.error('Error fetching lesson details:', error);
      }
    );
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log(this.selectedFile);
    }
  }

  onUpload() {
    const storedSubjectID = localStorage.getItem('subjectID');
    const storedModuleID = localStorage.getItem('moduleid');
    this.lessonId = localStorage.getItem('Lesson Id');
    if (this.selectedFile) {
      this.apiserv.uploadFile(this.lessonId, this.selectedFile).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', storedModuleID, 'mat']);
        },
        (error) => {
          console.error('Error uploading file:', error);
          alert('Error uploading file');
        }
      );
    } else {
      alert('No file selected or lesson ID missing');
    }
  }
}
