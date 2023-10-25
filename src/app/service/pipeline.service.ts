import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class PipelineService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,

  ) { }
  baseUrl = environment.apiUrl;


  CreatePipeline(data: any): Observable<any[]> {

    return this.http.post<any>(`${this.baseUrl}/api/pipeline/createPipeline`, data);
  }

  fetchAllPipelines(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/api/pipeline/fetchAllPipelines`);
  }

  EditPipeline(pipelineId: string, updatedPipeline: any): Observable<any[]> {

    return this.http.put<any>(`${this.baseUrl}/api/pipeline/editPipeline`, updatedPipeline);
  }

  DeletePipeline(pipelineId: string) {
    const url = `${this.baseUrl}/api/pipeline/deletePipeline?pipelineId=${pipelineId}`;
    return this.http.delete(url);
  }
  TriggerPipeline(githubRepository:string,name:string){
    //console.log("service "+githubRepository)

    const data={
      githubRepository:githubRepository,
      name:name

    }

    //console.log(data)


     this.http.post(`${this.baseUrl}/api/pipeline/triggerPipeline`,data).subscribe((res)=>{
      console.log(res)
      if(res){
        this.toastr.success("Pipeline Triggered")

      }
    });


  }

}
