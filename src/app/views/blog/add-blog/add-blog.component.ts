import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogService } from '../../../service/blog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent {
  id!: string;
  blogContent: string = '';
  blogContentTrim: String = '';
  blog: any;

  isLoading = false;
  @ViewChild('myForm')
  myForm!: NgForm;

  constructor(
    private blogservice: BlogService,
    private toastr: ToastrService
  ) {}

  submit() {
    //console.log(arg.value.input)
    this.isLoading = true;
    const arg = this.myForm;
    this.blogservice
      .generateBlog(arg.value.blogName, arg.value.imageName, arg.value.username)
      .subscribe((response) => {
        this.isLoading = false;
        if (response.status === 'success') {
          this.toastr.success('Blog created successfully');
          this.myForm.reset();
        } else {
          this.isLoading = false;
          this.toastr.warning('something went wrong');
        }
      });

  }
}
