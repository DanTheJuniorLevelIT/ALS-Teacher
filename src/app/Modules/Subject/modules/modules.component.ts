import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../../../apiservice.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [RouterModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']  // Fixed to styleUrls
})
export class ModulesComponent implements OnInit {

  isLoading: boolean = false; // This controls the loader visibility
  
  subjectID: number | null = null;
  storedSubjectID: any;
  modules: any;
  moduls: any;
  classId: any;
  moduleDetails: any;
  isModalOpen = false;
  
  createModule = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null),
    date: new FormControl(null),
    classid: new FormControl(localStorage.getItem('subjectID'))
  });

  constructor(
    private apiService: ApiserviceService,
    private route: Router, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadModules();
    this.storedSubjectID = localStorage.getItem('subjectID');
    
    this.apiService.getModules(this.storedSubjectID).subscribe((response: any) => {
      this.modules = response;
      console.log('Modules:', this.modules);
    });
  }

  loadModules() {
    this.isLoading = true; // Show the loader before the data is loaded

    // Simulate data fetching (you can replace this with an actual service call)
    setTimeout(() => {
      this.isLoading = false; // Hide the loader after data is fetched
    }, 1000); // Simulated delay of 3 seconds
  }

  save() {
    if (this.createModule.valid) {
      this.apiService.createMods(this.createModule.value).subscribe(
        (response) => {
          Swal.fire({
            title: "Success",
            text: "Module created",
            icon: "success"
          });
          console.log('Module created:', response);
          this.closeModal(); // Close the modal after creation
          this.getModules(this.storedSubjectID); // Reload the module list
          this.createModule.reset();  // Reset the createModule form
        },
        (error) => {
          Swal.fire({
            title: "Error",
            text: "Error Creating Module: " + error,
            icon: "error"
          });
          console.error('Error creating module:', error);
        }
      );
    }
  }

  getModules(id: number) {
    this.apiService.getModules(id).subscribe(
      (response) => {
        this.modules = response;   
        this.moduleDetails = response;
        this.cdr.detectChanges();  // Manually trigger change detection
        console.log('Module Details:', this.moduleDetails);
      },
      (error) => {
        console.error('Error fetching module details:', error);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  setModuleID(id: any, title: any, description: any) {
    localStorage.setItem('moduleid', id);  // Correctly sets the module id
    localStorage.setItem('moduletitle', title);
    localStorage.setItem('moduledescription', description);
  }
}
