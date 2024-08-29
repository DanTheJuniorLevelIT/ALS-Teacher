import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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

export class SubjectComponent {
  isModalOpen = false;

  subjects: Subject[] = [
    { title: 'BLP: Communication Skills', time: '8:00AM - 9:00AM', image: './assets/SCTS.jfif', level: 'blp' },
    { title: 'BLP: Communication Skills (Filipino)', time: '8:00AM - 9:00AM', image: './assets/SCTS.jfif', level: 'blp' },
    { title: 'BLP: Problem-solving and Critical Thinking', time: '9:00AM - 10:00AM', image: './assets/math.jfif', level: 'blp' },
    { title: 'BLP: Understanding the Self and Society', time: '10:00AM - 11:00AM', image: './assets/understanding.jpg', level: 'blp' },
    { title: 'ALS ELEM: Communication Skills', time: '8:00AM - 9:00AM', image: './assets/SCTS.jfif', level: 'alsElem' },
    { title: 'ALS ELEM: Problem-solving and Critical Thinking', time: '9:00AM - 10:00AM', image: './assets/math.jfif', level: 'alsElem' },
    { title: 'ALS ELEM: Understanding the Self and Society', time: '10:00AM - 11:00AM', image: './assets/understanding.jpg', level: 'alsElem' },
    { title: 'ALS ELEM: Life and Career Skills', time: '1:00PM - 2:00PM', image: './assets/life.jpg', level: 'alsElem' },
    { title: 'ALS ELEM: Mathematical and Problem-solving Skills', time: '9:00AM - 10:00AM', image: './assets/math.jfif', level: 'alsElem' },
    { title: 'ALS JHS: Communication Skills', time: '8:00AM - 9:00AM', image: './assets/SCTS.jfif', level: 'alsJhs' },
    { title: 'ALS JHS: Problem-solving and Critical Thinking', time: '9:00AM - 10:00AM', image: './assets/math.jfif', level: 'alsJhs' },
    { title: 'ALS JHS: Understanding the Self and Society', time: '10:00AM - 11:00AM', image: './assets/understanding.jpg', level: 'alsJhs' },
    { title: 'ALS JHS: Life and Career Skills', time: '1:00PM - 2:00PM', image: './assets/life.jpg', level: 'alsJhs' },
    { title: 'ALS JHS: Digital Citizenship', time: '2:00PM - 3:00PM', image: './assets/life.jpg', level: 'alsJhs' },
    { title: 'ALS JHS: Mathematical and Problem-solving Skills', time: '9:00AM - 10:00AM', image: './assets/math.jfif', level: 'alsJhs' },
  ];

  filteredSubjects: Subject[] = [...this.subjects];

  onLevelChange(event: Event) {
    const selectedLevel = (event.target as HTMLSelectElement).value;

    if (selectedLevel === 'all') {
      this.filteredSubjects = [...this.subjects];
    } else {
      this.filteredSubjects = this.subjects.filter(subject => subject.level === selectedLevel);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
