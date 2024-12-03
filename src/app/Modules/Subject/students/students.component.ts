import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})

export class StudentsComponent implements OnInit {
  students: any;
  classid: any;
  total: any;

  constructor(private apiserv: ApiserviceService) { }

  ngOnInit(): void {
    this.classid = localStorage.getItem('classid');
    this.loadStudentByClass(this.classid);
  }

  loadStudentByClass(cid: any){
    this.apiserv.getStudentsByClass(cid).subscribe((students: any)=>{
      this.students = students.allStudents
      this.total = students.total
      console.log(this.students);
    })
  }

}