import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../../../apiservice.service';

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [RouterModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css'
})

export class ModulesComponent implements OnInit{

  subjectID: number | null = null;

  ngOnInit(): void {
    // Retrieve the subjectID from localStorage
    const storedSubjectID = localStorage.getItem('subjectID');
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      console.log('Retrieved Subject ID from localStorage:', this.subjectID);
    } else {
      console.error('No subjectID found in localStorage.');
    }
  }

  // ngOnInit(): void {
  //   // Get the subjectId from route parameters
  //   this.route.params.subscribe(params => {
  //     this.subjectID = +params['id'];  // The '+' ensures it's treated as a number
  //     if (this.subjectID) {
  //       this.getSubjectDetails(this.subjectID);
  //     } else {
  //       console.error('Invalid ID:', this.subjectID);
  //     }
  //   });
  // }

  // getSubjectDetails(id: number) {
  //   this.apiserv.getSpecSubjects(id).subscribe(
  //     (response) => {
  //       this.subjectDetail = response;
  //       this.cdr.detectChanges();  // Manually trigger change detection
  //       console.log('Subject Details:', this.subjectDetail);
  //     },
  //     (error) => {
  //       console.error('Error fetching subject details:', error);
  //     }
  //   );
  // }

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
