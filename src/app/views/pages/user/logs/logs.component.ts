import { Component,ViewChild,AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import{TokenService} from '../../../../service/token.service'


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],


})
export class LogsComponent {
  baseUrl = environment.apiUrl;
  selectedValue: string | null= '';
  LogDetails:any=[];
  formattedStartDate:any;
  formattedEndDate:any;
  data:any;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  constructor(private http:HttpClient,private toastr:ToastrService,private TokenService:TokenService){}


  ListOfApis = [
    {value: 'signup', viewValue: 'Signup'},
    {value: 'validate', viewValue: 'Validate'},
    {value: 'login', viewValue: 'Login'},
    {value: 'edit', viewValue: 'Edit'},
    {value: 'deleteUser', viewValue:'Delete User'},
    {value: 'getDetails', viewValue: 'Get Details'},
    {value: 'resetPassword', viewValue:'Reset Password'},
    {value: 'resetPasswordRequest',viewValue:'Reset Password Request'},
    {value: 'createJiraIssue',viewValue:'Create Jira Issue'},
    {value: 'fetchJiraIssues',viewValue:'Fetch Jira Issues'},
    {value: 'editJiraIssue',viewValue:'Edit Jira Issue'},

  ];
  ListOfUser = [
    {value: '', viewValue: 'User1'},
    {value: '', viewValue: 'User2'},
    {value: '', viewValue: 'User3'},
    {value: '', viewValue: 'User4'},
  ];

  onSelectChange() {
    console.log(this.selectedValue);


  }
  resetDatePicker(){
    this.range.reset();
    this.selectedValue=null;

  }



  formatDateRange(startDate:Date, endDate:Date) {

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);


    const startDay = startDateObj.getDate().toString().padStart(2, '0');
    const startMonth = (startDateObj.getMonth() + 1).toString().padStart(2, '0');
    const startYear = startDateObj.getFullYear();


    const endDay = endDateObj.getDate().toString().padStart(2, '0');
    const endMonth = (endDateObj.getMonth() + 1).toString().padStart(2, '0');
    const endYear = endDateObj.getFullYear();


    this.formattedStartDate = `${startDay}/${startMonth}/${startYear}`;
    this.formattedEndDate = `${endDay}/${endMonth}/${endYear}`;

  }


  searchApi(){
    this.TokenService.fetchToken()
    //console.log("RangevalueStart "+this.range.value.start)
    //console.log("RangevalueEND "+this.range.value.end)

    if (!this.selectedValue && !this.range.value.start) {
      this.toastr.error('Please select API or enter Start Date.');
      return;
    }

    if (this.range.value.start) {
      this.formatDateRange(this.range.value.start, this.range.value.end || new Date());
    }
        this.data={
          api:this.selectedValue,
          startDate:this.formattedStartDate,
          endDate:this.formattedEndDate
        }

    //console.log("Data "+this.data)




    this.http.post<any>(`${this.baseUrl}/api/user/fetchLogs`,this.data).subscribe((response) => {

      console.log(response)
      if(response.message==="No logs found for the specified date"||response.message==="No logs found"){
        //alert("No Logs")
        console.log(response)
        //this.hasResponse=false
        this.toastr.error("No Logs Found")

      }
      else if(response){
        console.log(response)

        //this.hasResponse=true
        this.LogDetails=response;


      }
    })


  }
}
