import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {
  private profileImageUrlSubject = new BehaviorSubject<string>('');
  profileImageUrl$: Observable<string> = this.profileImageUrlSubject.asObservable();

  setProfileImageUrl(url: string) {
    this.profileImageUrlSubject.next(url);
  }
}