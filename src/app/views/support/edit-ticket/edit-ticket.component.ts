import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { JiraService} from '../../../service/jira.service'
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {
  constructor(private route: ActivatedRoute,private JiraService:JiraService,private toastr:ToastrService,private router:Router){

  }

  issue: any;
  issueKey: string | undefined;
  isSubmitting = false;


  ngOnInit(): void {




    const issueData = this.route.snapshot.paramMap.get('issue');
    // this.issue = JSON.parse(issueData);
    if (issueData !== null) {
      this.issue = JSON.parse(issueData);
      this.issueKey = this.issue.issueKey;
    } else {

      console.error("Issue data not found in route.");
    }

    console.log(issueData)
  }

  updateIssue(data:NgForm){
    this.isSubmitting = true;
    //console.log(data)

    this.JiraService.UpdateJiraIssue(data.value,this.issueKey).subscribe((res) => {
      this.isSubmitting = false;
      data.resetForm();
      console.log(res);
      if (res.status === 'success') {
        this.toastr.success('Ticket updated successfully');
        this.router.navigate(['home/support/tickets']);
      } else {
        this.toastr.warning('Something went wrong.Please try again');
        this.isSubmitting = false;
        this.router.navigate(['home/support/tickets']);
      }
    });
    data.resetForm()

  }
}
