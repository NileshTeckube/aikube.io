import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  //baseUrl = environment.apiUrl;
  baseUrl=environment.apiUrl;


  isLoading = true;

  constructor(private http:HttpClient,private toastr: ToastrService) { }

  sendPostRequest(data: any): Observable<any> {
    const url = 'your_backend_url';
    return this.http.post(url, data);

  }

  generateBlog(blogName:string,imageName:string,username:string): Observable<any> {
    console.log("blogName =>"+blogName)
    console.log("imageName =>"+ imageName)
    console.log("username =>"+username)

    const data = {
      blogName: blogName,
      imageName: imageName,
      username: username
    };
    return this.http.post<any>(`${this.baseUrl}/api/user/generateBlog`,data)
    //      console.log(res)
    //   this.isLoading = true;

    //   //console.log(res.blogId)
    //   if(res.status==='success'){
    //          this.toastr.success('Blog created successfully')
    //   }else{
    //     this.toastr.warning('something went wrong')
    //   }
    // })
  }

  getBlogById(id: string){

    return this.http.get<any[]>(`${this.baseUrl}/api/user/getBlogPost/${id}`)

  }




}
