import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modulesmain',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './modulesmain.component.html',
  styleUrl: './modulesmain.component.css'
})
export class ModulesmainComponent implements OnInit{
  
  subjectId: number | null = null;
  subjectDetail: any;
  isModalOpen = false;

  constructor(
    private apiserv: ApiserviceService, 
    private route: ActivatedRoute, 
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}
  
  openModal() {
    this.isModalOpen = true;
  }
  
  closeModal() {
    this.isModalOpen = false;
  }
  
  ngOnInit(): void {
    // Get the subjectId from route parameters
    this.route.params.subscribe(params => {
      this.subjectId = +params['id'];  // The '+' ensures it's treated as a number
      if (this.subjectId) {
        this.getSubjectDetails(this.subjectId);
      } else {
        console.error('Invalid ID:', this.subjectId);
      }
    });
  }

  getSubjectDetails(id: number) {
    this.apiserv.getSpecSubjects(id).subscribe(
      (response) => {
        this.subjectDetail = response;
        this.cdr.detectChanges();  // Manually trigger change detection
        console.log('Subject Details:', this.subjectDetail);
      },
      (error) => {
        console.error('Error fetching subject details:', error);
      }
    );
  }
  // getSubjectDetails(id: number) {
  //   const apiUrl = `http://localhost:8000/api/subjects/${id}`;
  //   this.http.get(apiUrl).subscribe(
  //     (response: any) => {
  //       this.subjectDetails = response;
  //       console.log(this.subjectDetails);
  //     },
  //     (error) => {
  //       console.error('Error fetching subject details:', error);
  //     }
  //   );
  // }

}
