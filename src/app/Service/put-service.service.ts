import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlContant } from 'src/assets/Url-Contant';

@Injectable({
  providedIn: 'root'
})
export class PutServiceService {
  userDefinedURLs = UrlContant;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.userDefinedURLs = new UrlContant();
  }

  editUser(data: any): Observable<any> {
    return this.http.put(this.userDefinedURLs.EditUserUrl, data);
  }

  editEvent(data: any): Observable<any> {
    return this.http.put(this.userDefinedURLs.EditEventUrl, data);
  }

  editReward(data: any): Observable<any> {
    return this.http.put(this.userDefinedURLs.EditRewardUrl, data);
  }

  editContact(data: any): Observable<any> {
    return this.http.put(this.userDefinedURLs.EditContactUrl, data);
  }

}
