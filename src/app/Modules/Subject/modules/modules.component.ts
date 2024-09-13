import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  storedSubjectID: any;
  modules: any;

  constructor(private apiService: ApiserviceService, private router: Router) {}


  ngOnInit(): void {
    // const storedSubjectID = localStorage.getItem('subjectID');
    this.storedSubjectID = localStorage.getItem('subjectID');
    this.apiService.getSubModules(this.storedSubjectID).subscribe((response: any)=>{
      this.modules = response.modules
      console.log('Modules:', this.modules);
    })
  }

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

  // navigateToMaterials(id: any) {
  //   const storedSubjectID = localStorage.getItem('subjectID');
  //   localStorage.setItem('module', id);
  //   // Store the subjectID in localStorage
  //   // localStorage.setItem('assid', assID.toString());

  //   // Navigate to the modules page
  //   // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
  //   // this.router.navigate(['/main/Subject/main/subject/modulesmain/', storedSubjectID, 'modules', 'mat']);
  //   this.router.navigate(['/main/Subject/main/subject/modulesmain/', storedSubjectID, 'modules', id, 'mat']);
  // }

  setModuleID(id: any, title: any) {
    localStorage.setItem('moduleid', id)
    localStorage.setItem('moduletitle', title)
  }

}
