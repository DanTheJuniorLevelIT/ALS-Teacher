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
// export class StudentsComponent implements OnInit{

//   students = [
//     { name: 'Emma Johnson' },
//     { name: 'Liam Smith' },
//     { name: 'Olivia Brown' },
//     { name: 'Noah Jones' },
//     { name: 'Ava Garcia' },
//     { name: 'William Miller' },
//     { name: 'Sophia Davis' },
//     { name: 'James Wilson' },
//     { name: 'Isabella Taylor' },
//     { name: 'Benjamin Anderson' },
//     { name: 'Mia Thomas' },
//     { name: 'Lucas Martinez' },
//     { name: 'Charlotte Lee' },
//     { name: 'Henry White' },
//     { name: 'Amelia Harris' },
//     { name: 'Alexander Clark' },
//     { name: 'Evelyn Lewis' },
//     { name: 'Michael Walker' },
//     { name: 'Abigail Hall' },
//     { name: 'Elijah Scott' },
//     { name: 'Emily Young' },
//     { name: 'Daniel Hernandez' },
//     { name: 'Harper King' },
//     { name: 'Matthew Robinson' },
//     { name: 'Ella Wright' }
//   ];

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

export class StudentsComponent implements OnInit {

  activities = [
    { id: 1, name: 'Activity 1', totalScore: 10 },
    { id: 2, name: 'Activity 2', totalScore: 10 },
    { id: 3, name: 'Activity 3', totalScore: 8 },
    { id: 4, name: 'Activity 4', totalScore: 8 },
    { id: 5, name: 'Activity 5', totalScore: 12 }
  ];

  students = [
    { name: 'Emma Johnson', completedActivities: [1, 3], scores: {1: 10, 3: 7} },
    { name: 'Liam Smith', completedActivities: [1, 3, 5], scores: {1: 9, 3: 7, 5: 12} },
    { name: 'Olivia Brown', completedActivities: [2, 4], scores: {2: 10, 4: 8} },
    { name: 'Noah Jones', completedActivities: [1, 2, 5], scores: {1: 10, 2: 10, 5: 12} },
    { name: 'Ava Garcia', completedActivities: [1, 2, 3], scores: {1: 9, 2: 10, 3: 7} },
    { name: 'William Miller', completedActivities: [2, 3], scores: {2: 8, 3: 7} },
    { name: 'Sophia Davis', completedActivities: [1, 2, 3, 4], scores: {1: 10, 2: 9, 3: 8, 4: 7} },
    { name: 'James Wilson', completedActivities: [1, 2, 3, 4, 5], scores: {1: 9, 2: 9, 3: 8, 4: 8, 5: 12} },
    { name: 'Isabella Taylor', completedActivities: [1], scores: {1: 10} },
    { name: 'Benjamin Anderson', completedActivities: [1], scores: {1: 9} },
    { name: 'Mia Thomas', completedActivities: [1, 2, 3, 5], scores: {1: 10, 2: 9, 3: 8, 5: 12} },
    { name: 'Lucas Martinez', completedActivities: [1, 2, 3, 4], scores: {1: 8, 2: 9, 3: 7, 4: 8} },
    { name: 'Charlotte Lee', completedActivities: [1, 2, 5], scores: {1: 10, 2: 10, 5: 12} },
    { name: 'Henry White', completedActivities: [1, 2, 4], scores: {1: 9, 2: 8, 4: 7} },
    { name: 'Amelia Harris', completedActivities: [1, 4], scores: {1: 10, 4: 8} },
    { name: 'Alexander Clark', completedActivities: [1, 5], scores: {1: 9, 5: 12} },
    { name: 'Evelyn Lewis', completedActivities: [5], scores: {5: 11} },
    { name: 'Michael Walker', completedActivities: [4, 5], scores: {4: 7, 5: 12} },
    { name: 'Abigail Hall', completedActivities: [2, 5], scores: {2: 10, 5: 12} },
    { name: 'Elijah Scott', completedActivities: [3, 5], scores: {3: 8, 5: 12} },
    { name: 'Emily Young', completedActivities: [2, 5], scores: {2: 9, 5: 11} },
    { name: 'Daniel Hernandez', completedActivities: [1, 2, 4], scores: {1: 10, 2: 9, 4: 8} },
    { name: 'Harper King', completedActivities: [1, 2, 5], scores: {1: 8, 2: 9, 5: 12} },
    { name: 'Matthew Robinson', completedActivities: [1, 2, 5], scores: {1: 10, 2: 9, 5: 12} },
    { name: 'Ella Wright', completedActivities: [1, 3], scores: {1: 10, 3: 7} }
  ];

  constructor() { }

  ngOnInit(): void { }

  getScore(student: any, activityId: number): number {
    return student.scores[activityId] || 0;
  }
}