import { Component, OnInit, ViewChild } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { ToastrService } from 'ngx-toastr';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeDetectorRef } from '@angular/core';

import {
  cilListNumbered,
  cilPaperPlane,
  cilPlus,
  cibAddthis,
  cilPencil,
  cilChartLine
} from '@coreui/icons';
import { NgForm } from '@angular/forms';
import { JiraService } from '../../../service/jira.service';
import { Issue } from '../../../service/jiraissue.model';
import { Router } from '@angular/router';
import{TokenService} from '../../../service/token.service'
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  issuesData: Issue[] = [];
  pageSize: number = 5;
  currentPage: number = 1;
  isLoading = true;
  isSubmitting = false;
  showModal = false;
  isFormInvalid = false;
  selectedIssueKey: string | null = null;
  selectedComment: any ;
  commentsOfselectedIssue:any;
  public Editor = ClassicEditor;
  ckeditorContent = '';
  currentIssueKey:any;
  commentData:any;
  showCommentSuccess:boolean=false;
  commentButton:boolean=true;
  showSpinner = false;
  public visible = false;
  comments:Issue[]=[];


  constructor(
    public iconSet: IconSetService,
    private JiraService: JiraService,
    private router: Router,
    private toastr: ToastrService,
    private TokenService:TokenService,
    private cdr: ChangeDetectorRef
  ) {
    iconSet.icons = {
      cilListNumbered,
      cilPaperPlane,
      cilPlus,
      cibAddthis,
      cilPencil,
      cilChartLine
    };
  }

  ngOnInit(): void {
    this.viewTickets();
  }


  getIssueKey(event:any) {
    this.visible = !this.visible;
    this.currentIssueKey=event
    console.log(this.currentIssueKey);
    this.commentsOfselectedIssue = this.issuesData.find(issue => issue.issueKey === this.currentIssueKey);

  }

  handleLiveDemoChange(event: any) {
    this.visible = event;

  }
   onEditorChange(event: any) {
    const htmlString = this.ckeditorContent;
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    this.commentData = div.textContent || div.innerText;
    //this.ckeditorContent=event.target.value;

  }






  viewTickets(){
    this.TokenService.fetchToken()
    this.isLoading = true;
    this.JiraService.ViewJiraIssue().subscribe(
      (data:any) => {
        if(data >=data[0]){
        this.issuesData = data;
        //console.log(this.issuesData)
        // for (const issue of this.issuesData) {
        //   console.log(`Issue: ${issue.issueKey}`);

        //   // Iterate through the comments of each issue
        //   for (const comment of issue.comments) {
        //     //console.log(`Comment by ${comment.authorName}: ${comment.body}`);
        //   }
        // }
        this.isLoading = false;
       }
       else if(data.status==='error'||data.message){
        this.isLoading = false;
        this.toastr.error("You have not created any tickets")
         }
      });
  }

  CreateComment(){
    const comment={
      issueKey:this.currentIssueKey,
      comment:this.commentData
    }
      this.showSpinner = true;
      this.JiraService.AddComment(comment).subscribe((res:any)=>{

        this.ckeditorContent='';
        if(res.status==="success"){
        this.showSpinner = false;
        this.toastr.success("Comment Added Successfully")
        const selectedIssueIndex = this.issuesData.findIndex(issue => issue.issueKey === this.currentIssueKey);
        if (selectedIssueIndex !== -1) {

          this.issuesData[selectedIssueIndex].comments.push({
            body: this.commentData,
            //author: this.issuesData[selectedIssueIndex].comments.author
            //authorName: 'Current User'
          });
        }
      }

      });

   }



  createJiraIssue(data: NgForm) {
    this.isLoading = true;
    if (!data.value.summary || !data.value.description) {
      this.isFormInvalid = true;
      return;
    }
    this.isFormInvalid = false;
    this.isSubmitting = true;
    this.JiraService.CreateJiraIssue(data.value).subscribe((res:any) => {
      this.isSubmitting = false;
      data.resetForm();
      if (res.message) {
        this.toastr.success('Ticket created successfully');
        window.location.reload();
      } else {
        this.toastr.error('Something went wrong');
        this.isSubmitting = false;
      }

    });
  }



  editIssue(issue: Issue) {
    this.router.navigate([
      'home/support/editTickets',
      { issue: JSON.stringify(issue) },
    ]);
  }


}
