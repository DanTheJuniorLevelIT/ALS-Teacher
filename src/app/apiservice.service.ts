import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private url = "http://localhost:8000/";

  constructor(private http: HttpClient) { }

  // getSubjects() {
  //   return this.http.get(this.url + 'api/execute');
  // }

  getSubjects() {
    return this.http.get(this.url + 'api/subjects');
  }

  
  getSpecSubjects(id: number) {
    return this.http.get(`${this.url}api/subjects/${id}`);
  }

  getAllSubjects() {
    return this.http.get(this.url + 'api/subjects/showAll');
  }

  createUser(data: any) {
    return this.http.post('/api/users', data);
  }
}
