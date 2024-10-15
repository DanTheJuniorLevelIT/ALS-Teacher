import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

interface Subject {
  title: string;
  time: string;
  image: string;
  level: string;
}

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
// export class SubjectComponent {

//   isModalOpen = false;

//   openModal() {
//     this.isModalOpen = true;
//   }

//   closeModal() {
//     this.isModalOpen = false;
//   }

// }

export class SubjectComponent implements OnInit{
  isModalOpen = false;
  allSubjects: any;
  subBlp: any;
  subAlsElem: any;
  subAlsJhs: any;
  authtoken: any;
  teacherid: any;
  


  constructor(private apiserv: ApiserviceService, private route: Router) {}

  isLoading: boolean = false; // This controls the loader visibility

  ngOnInit(): void {
    this.loadSubjects();
    const id = localStorage.getItem('id');
    this.teacherid = id;
    this.apiserv.getAllTeacherSubjects(this.teacherid).subscribe(
      (response) => {
        this.allSubjects = response;
        this.filteredSubjects();
        // console.log(this.filteredSubjects());
      },
      (error) => {
        console.error('Error fetching subjects:', error);
      }
    );
  }

  loadSubjects() {
    this.isLoading = true; // Show the loader before the data is loaded

    // Simulate data fetching (you can replace this with an actual service call)
    setTimeout(() => {
      this.isLoading = false; // Hide the loader after data is fetched
    }, 2000); // Simulated delay of 3 seconds
  }

  filteredSubjects(){
    this.subBlp = this.allSubjects.filter((sub: { Program: string; }) => sub.Program == 'blp');
    this.subAlsElem = this.allSubjects.filter((sub: { Program: string; })=> sub.Program == 'alsElem');
    this.subAlsJhs = this.allSubjects.filter((sub: { Program: string; }) => sub.Program == 'alsJhs');
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  navigateToModules(subjectID: number) {
    // Store the subjectID in localStorage
    localStorage.setItem('subjectID', subjectID.toString());

    // Navigate to the modules page
    // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
    this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID]);
  }
}
