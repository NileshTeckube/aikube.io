import { Component, ChangeDetectorRef } from '@angular/core';
import { AWSS3Service } from '../../../service/aws-s3.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { ProfileImageService } from '../../../service/profile-image.service';
import { ToastrService } from 'ngx-toastr';

import { computeStyles } from '@popperjs/core';

@Component({
  selector: 'app-upload-profile-image',
  templateUrl: './upload-profile-image.component.html',
  styleUrls: ['./upload-profile-image.component.scss']
})
export class UploadProfileImageComponent {

  selectedFile: File | undefined;
  sshKey: string = '';
  profileImageUrl: string = '';

  response: any;

  constructor(private awsS3Service: AWSS3Service, private authService: AuthService, private router: Router, private toastr: ToastrService, private profileImageService: ProfileImageService, private cdRef: ChangeDetectorRef) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  uploadProfileImage() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not available.');
      return;
    }
    this.awsS3Service.uploadProfileImage(userId, this.selectedFile)
      .then(async (result) => {
        if (result) {
          this.toastr.success('Profile image uploaded successfully');
          // console.log('Profile image uploaded successfully. with name' + result)
          this.response = result;
          const uploadedKey = this.response.Key;
          // console.log('Uploaded Key:', uploadedKey);




          // console.log(this.response)
          //this.http.put<any>(`${this.baseUrl}/api/user/edit`, editData).subscribe((res) => {

          //})

          // Fetch the profile image URL from S3
          const imageUrl = await this.awsS3Service.getProfileImageUrl(userId) as string;
          const baseUrl = imageUrl.split('?')[0];
          // console.log("imageUrl", baseUrl)

          if (baseUrl) {
            this.profileImageUrl = baseUrl;  // Update the profileImageUrl
            this.cdRef.detectChanges(); // Trigger change detection
          }
        } else {
          this.toastr.error('Profile image upload failed.');
          console.log('Profile image upload failed.');
        }
        this.router.navigate(['/home/dashboard']); // Navigate to home/dashboard
      })
      .catch(error => {
        this.toastr.error('Error uploading profile image.');
        console.error('Error uploading profile image:', error);
      });
  }
  addSSHKey() {
    if (!this.sshKey) {
      console.error('No SSH key provided.');
      return;
    }

    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not available.');
      return;
    }

    this.awsS3Service.addSSHKey(userId, this.sshKey)
      .then(result => {
        if (result) {
          this.toastr.success('SSH key uploaded successfully.');
          console.log('SSH key uploaded successfully.');
        } else {
          this.toastr.error('SSH key upload failed.');
          console.log('SSH key upload failed.');
        }
      })
      .catch(error => {
        this.toastr.error('Error uploading SSH key.');
        console.error('Error uploading SSH key:', error);
      });
  }
}


