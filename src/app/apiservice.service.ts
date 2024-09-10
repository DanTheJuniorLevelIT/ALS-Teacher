import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private url = "http://localhost:8000/"; 

  constructor(private http: HttpClient) { }

  // getSubjects() {
  //   return this.http.get(this.url + 'api/execute');
  // }

  verifyAdmin(login: any){
    return this.http.post(this.url + 'api/loginAdmin', login);
  }

  outAdmin(token: string): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.post(this.url + 'api/logoutAdmin', {}, { headers });
  }

  getSubjects() {
    return this.http.get(this.url + 'api/subjects');
  }

  getAssessment() {
    return this.http.get(this.url + 'api/subjects/assessment');
  }
  
  getSpecSubjects(id: number) {
    return this.http.get(`${this.url}api/subjects/${id}`);
  }

  getAllSubjects() {
    return this.http.get(this.url + 'api/subjects/showAll');
  }

  createAssess(data: any){
    return this.http.post(this.url + 'api/subjects/create', data);
  }

  createUser(data: any) {
    return this.http.post('/api/users', data);
  }
}
