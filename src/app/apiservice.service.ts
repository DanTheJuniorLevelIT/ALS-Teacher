import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private url = "http://localhost:8000/";
  token = localStorage.getItem('authToken')

  constructor(private http: HttpClient) {}

  // Example: loginAdmin does not need an authorization token
  verifyAdmin(login: any){
    return this.http.post(this.url + 'api/loginAdmin', login);
  }

  // Use the token for authorized requests
  outAdmin(token: string){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/logoutAdmin', {}, { headers });
  }

  // Example for getSubjects with authorization
  getSubjects(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects', { headers });
  }

  getAssessment(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects/assessment', { headers });
  }

  getAssessmentDetails(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/showAssessment/${id}`, { headers });
  }


  getSpecSubjects(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/${id}`, { headers });
  }

  getTeacherSubjects(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/teacherSub/${id}`, { headers });
  }

  getAllSubjects(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects/showAll', { headers });
  }

  getSubModules(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/modules/${id}`, { headers });
  }

  getAllTeacherSubjects(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/allSubjects/${id}`, { headers });
  }

  createAssess(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/subjects/create', data, { headers });
  }

  createQuestion(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/subjects/createQuestion', data, { headers });
  }

  getQuestion(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/showQuestion/${id}`, { headers });
  }

  editQuestion(data: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.put(`${this.url}api/subjects/editQuestion/${data.question_id}`, data, { headers });
  }

  createUser(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/users', data, { headers });
  }
}

