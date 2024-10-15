import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-lesson',
  standalone: true,
  imports: [RouterModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule,ReactiveFormsModule],
  templateUrl: './update-lesson.component.html',
  styleUrl: './update-lesson.component.css'
})
export class UpdateLessonComponent  implements OnInit{
  lesson_id = localStorage.getItem('Lesson ID');
  idNumber:any;
  lesson:any;
  fileName: string | null = null;
  selectedFile: File | null = null;
  
  updateLessonForm = new FormGroup({
    modules_id: new FormControl(localStorage.getItem('moduleid')),
    topic_title: new FormControl(null),
    lesson: new FormControl(null),
  }); 
  
  constructor(
    private apiserv: ApiserviceService, 
    private router: Router, 
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    const lesson_id = localStorage.getItem('Lesson Id');
    console.log('lesson',lesson_id)
    this.idNumber = Number(lesson_id); 
    this.apiserv.getLesson(this.idNumber).subscribe((result: any) =>{
      this.lesson = result;
      console.log(result);
      this.updateLessonForm.controls['topic_title'].setValue(this.lesson[0].topic_title);
      this.updateLessonForm.controls['lesson'].setValue(this.lesson[0].lesson );
      this.fileName = this.lesson[0].file || null; 
    })
  }
  
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; 
      this.fileName = file.name;  
    }
  }
  update() {
    const storedSubjectID = localStorage.getItem('subjectID');
    const storedModuleID = localStorage.getItem('moduleid');
    console.log(this.updateLessonForm.value)
    console.log('idnum',this.idNumber);
    if (this.updateLessonForm.valid) {
      this.apiserv.updateLessonInfo(this.idNumber, this.updateLessonForm.value).subscribe(
        (response) => {
          console.log('Lesson updated successfully', response);
          this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', storedModuleID, 'mat']);
        },
        (error) => {
          console.error('Error updating Lesson', error);
        }
      );
    } else {
      console.error('Form is invalid');
      // Add some error feedback to the user
    }
  }
  
}
