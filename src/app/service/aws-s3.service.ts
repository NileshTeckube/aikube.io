import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { awsConfig } from './aws-config';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AWSS3Service {
  private s3: AWS.S3;
  baseUrl = environment.apiUrl;

  //   constructor() {
  //     AWS.config.region = awsConfig.region;
  //     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //       IdentityPoolId: awsConfig.cognitoIdentityPoolId
  //     });
  constructor(public data: DataService, private http: HttpClient, private authService: AuthService, private toastr: ToastrService) {
    AWS.config.update({
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region,
    });

    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: awsConfig.bucketName },
    });
  }

  uploadProfileImage(userId: string, file: File): Promise<boolean> {
    const validExtensions = ['jpeg'];
    const contentType = file.type || 'application/octet-stream';
    const extension = contentType.split('/')[1].toLowerCase();
    
    if (!validExtensions.includes(extension)) {
      this.toastr.warning('Choose JPEG file')
      // console.log('Invalid file extension:', extension);
      return Promise.reject(false);
    }

    const fileName=`user_image_${userId}.${extension}`
    const key = `profile-photo/user_image_${userId}.${extension}`;

    const metadata = {
      'Content-Type': contentType,
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(
        {
          Bucket: awsConfig.bucketName,
          Key: key,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType,
          Metadata: metadata,
        },
        (err, response) => {
          if (err) {
            console.log('Error uploading file:', err);
            reject(false);
          } else {
            this.data.profileImageUrl = response.Location;
            // this.http.put<any>(`${this.baseUrl}/api/user/edit`, editData).subscribe((res) => {//})

            // console.log('File uploaded successfully:', response);

            //this.http.put<any>(`${this.baseUrl}/api/user/edit`, editData).subscribe((res) => {//})
            //API (edit)
            // resolve(true);
            // const editData=response.Key
            // editApi(){
            //   this.http.put<any>(`${this.baseUrl}/api/user/edit`, editData).subscribe((res) => {

            //     })
            // }
            this.authService.editProfileImage({profileImage: this.data.profileImageUrl})
            .then(() => {
            // console.log("profileImageUrl", this.data.profileImageUrl);
              resolve(true); // Resolve the outer promise
            })
            .catch(() => {
              reject(false); // Reject the outer promise
            });
          }
        }
      );
    });
  }

  addSSHKey(userId: string, sshKey: string): Promise<boolean> {
    const key = `ssh-key-provider/ssh_key_${userId}.txt`;

    const metadata = {
      'Content-Type': 'text/plain',
    };

    const body = new Blob([sshKey], { type: 'text/plain' });

    return new Promise((resolve, reject) => {
      this.s3.upload(
        {
          Bucket: awsConfig.bucketName,
          Key: key,
          Body: body,
          ACL: 'private',
          ContentType: 'text/plain',
          Metadata: metadata,
        },
        (err, data) => {
          if (err) {
            console.log('Error uploading SSH key:', err);
            reject(false);
          } else {
            console.log('SSH key uploaded successfully:', data);
            resolve(true);
          }
        }
      );
    });
  }
  getProfileImageUrl(userId: string): Promise<string | null> { 
    const key = `profile-photo/user_image_${userId}.jpeg`;

    return new Promise((resolve, reject) => {
      this.s3.headObject(
        { Bucket: awsConfig.bucketName, Key: key },
        (err, metadata) => {
          if (err) {
            console.error('Error fetching profile image metadata:', err);
            resolve(null);
          } else {
            const imageUrl = this.s3.getSignedUrl('getObject', {
              Bucket: awsConfig.bucketName,
              Key: key,
            });
            resolve(imageUrl);
          }
        }
      );
    });
  }
}
function editApi() {
  throw new Error('Function not implemented.');
}
