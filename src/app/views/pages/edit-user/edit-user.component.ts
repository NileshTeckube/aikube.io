import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  constructor(private AuthService:AuthService){}


  public signIn(formData: NgForm): void {
    this.AuthService.edit(formData.value);
    console.log(formData.value)
  }

}
