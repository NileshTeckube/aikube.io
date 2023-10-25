import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root',
})
export class JiraService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,


  ) {}

  //baseUrl = 'http://localhost:10000';
  baseUrl = environment.apiUrl;


  CreateJiraIssue(isssueData: any):Observable<any[]> {

      return this.http.post<any>(`${this.baseUrl}/api/jira/createJiraIssue`,isssueData);
  }

  ViewJiraIssue(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/api/jira/fetchJiraIssues`);
  }

  UpdateJiraIssue(editisssueData: any, issueKey: any) {
    const requestData = {
      issueKey,
      summary: editisssueData.summary,
      description: editisssueData.description,
    };
    return this.http
      .put<any>(`${this.baseUrl}/api/jira/editJiraIssue`,requestData)

  }
  AddComment(comment:any): Observable<any[]>{
    return this.http.post<any>(`${this.baseUrl}/api/jira/addJiraComment`,comment);
  }
}
