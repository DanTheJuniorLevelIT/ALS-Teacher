import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  


  constructor(private apiserv: ApiserviceService) {}

  // ngOnInit(): void {
  //   this.apiserv.getAllSubjects().subscribe(
  //     (response) => {
  //       this.subblp = response;
  //     },
  //     (error) => {
  //       console.error('Error fetching users:', error);
  //     }
  //   );
  // }
  ngOnInit(): void {
    this.apiserv.getAllSubjects().subscribe(
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
}
