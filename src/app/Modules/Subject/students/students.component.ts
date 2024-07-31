import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  students = [
    { name: 'Emma Johnson' },
    { name: 'Liam Smith' },
    { name: 'Olivia Brown' },
    { name: 'Noah Jones' },
    { name: 'Ava Garcia' },
    { name: 'William Miller' },
    { name: 'Sophia Davis' },
    { name: 'James Wilson' },
    { name: 'Isabella Taylor' },
    { name: 'Benjamin Anderson' },
    { name: 'Mia Thomas' },
    { name: 'Lucas Martinez' },
    { name: 'Charlotte Lee' },
    { name: 'Henry White' },
    { name: 'Amelia Harris' },
    { name: 'Alexander Clark' },
    { name: 'Evelyn Lewis' },
    { name: 'Michael Walker' },
    { name: 'Abigail Hall' },
    { name: 'Elijah Scott' },
    { name: 'Emily Young' },
    { name: 'Daniel Hernandez' },
    { name: 'Harper King' },
    { name: 'Matthew Robinson' },
    { name: 'Ella Wright' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
