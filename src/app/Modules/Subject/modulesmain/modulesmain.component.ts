import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modulesmain',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './modulesmain.component.html',
  styleUrl: './modulesmain.component.css'
})
export class ModulesmainComponent implements OnInit{
  
  subjectId: number | null = null;
  subjectDetail: any;
  classid: any;
  isModalOpen = false;
  title: string = '';
  instruction: string = '';
  announcements: any;
  announcementid: any;
  newAnnouncementTitle = '';
  newAnnouncementInstruction = '';

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

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  
  ngOnInit(): void {
    // Get the subjectId from route parameters
    const classid = localStorage.getItem('subjectID');
    this.classid = classid;
    this.route.params.subscribe(params => {
      this.subjectId = +params['id'];  // The '+' ensures it's treated as a number
      if (this.subjectId) {
        this.getSubjectDetails(this.classid);
        this.viewAnnouncement();
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

  addAnnouncement() {
    const announcementPayload = {
      subjectID: this.classid,
      title: this.newAnnouncementTitle,
      instruction: this.newAnnouncementInstruction
    };

    this.apiserv.createAnnouncement(announcementPayload).subscribe((result:any)=>{
      this.viewAnnouncement();
      this.resetForm();
      // this.closeModal();
    })
  }

  viewAnnouncement(){
    this.apiserv.getAnnouncement(this.classid).subscribe((response: any)=>{
      this.announcements = response.announce
      this.announcementid = response.announceid
      console.log(this.announcements);
      console.log(this.announcementid);
      console.log(this.classid);
      if(this.announcementid == this.classid){
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "question",
          title: "There is still an Announcement"
        });
      }
    })
  }

  resetForm() {
    this.newAnnouncementTitle = '';
    this.newAnnouncementInstruction = '';
  }
}
