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

  // Create a getter method for the URL
  getBaseUrl() {
    return this.url;
  }

  // Dan Work Services
  // Example: loginAdmin does not need an authorization token
  verifyAdmin(login: any){
    return this.http.post(this.url + 'api/loginAdmin', login);
  }

  // Use the token for authorized requests
  outAdmin(token: string){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/logoutAdmin', {}, { headers });
  }

  // Home and Subjects Services
  // Example for getSubjects with authorization
  getSubjects(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects', { headers });
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

  createAnnouncement(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/subjects/createAnnouncement', data, { headers });
  }

  getAnnouncement(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/showAnnouncement/${id}`, { headers });
  }

  // END

  //Discussion Services

  createDiscussion(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/subjects/createDiscuss', data, { headers });
  }

  getDiscussion(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects/discussion', { headers });
  }

  viewDiscussionReplies(discussionid: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/discussion/replies/${discussionid}`, { headers });
  }

  sendDiscussionReplies(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(`${this.url}api/subjects/discussion/reply`, data, { headers });
  }

  //END

  // Assessment Services
  createAssess(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/subjects/create', data, { headers });
  }

  getAssessment(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects/assessment', { headers });
  }

  getAssessmentDetails(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/showAssessment/${id}`, { headers });
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

  deleteQuestion(id: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.delete(`${this.url}api/subjects/deleteQuestion/${id}`, { headers });
  }

  getCompletionStats(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/getCompleted/${id}`, { headers });
  }

  getStudents(id: any, assid: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.get(`${this.url}api/subjects/students/${id}/${assid}`, { headers });
  }

  //1st approach
  // autoCheck(id: any, assid: any) {
  //   const headers = { 'Authorization': 'Bearer ' + this.token };
  //   return this.http.get(`${this.url}api/subjects/autocheck/${id}/${assid}`, { headers });
  // }

  autoCheck(id: any, assid: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/subjects/autocheck/${id}/${assid}`, null, { headers });
  }

  submitScore(data: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/subjects/submitScore`, data, { headers });
  }

  updateScore(data: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/subjects/updateScore`, data, { headers });
  }

  getStudentAnswers (id: any, lrnid: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.get(`${this.url}api/subjects/checking/${id}/${lrnid}`, { headers });
  }

  // END


  // User
  createUser(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/users', data, { headers });
  }

  // END

  //Elzaina Work Services











  //Mark Lemuel Work Services







  
}

