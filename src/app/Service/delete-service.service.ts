import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlContant } from 'src/assets/Url-Contant';

@Injectable({
  providedIn: 'root'
})
export class DeleteServiceService {
  userDefinedURLs = UrlContant;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  deleteUserByID(userID: string): Observable<any> {
    return this.http.delete(this.userDefinedURLs.DeleteUserByIDUrl + '?userID=' + userID);
  }
  deleteRoleByID(roleID: string): Observable<any> {
    return this.http.delete(this.userDefinedURLs.DeleteRoleByIDUrl + '?roleID=' + roleID);
  }

  deleteEventByID(eventID: string): Observable<any> {
    return this.http.delete(this.userDefinedURLs.DeleteEventByIDUrl + '?eventID=' + eventID);
  }

  deleteRewardByID(rewardID: string): Observable<any> {
    return this.http.delete(this.userDefinedURLs.DeleteRewardByIDUrl + '?rewardID=' + rewardID);
  }

  deleteContactByID(contactID: string): Observable<any> {
    return this.http.delete(this.userDefinedURLs.DeleteContactByIDUrl + '?contactID=' + contactID);
  }

  deleteUserFromEvent(userID: number, eventID: number): Observable<any> {
    return this.http.delete(this.userDefinedURLs.deleteUserFromEventUrl + '?userID=' + userID + '&eventID=' + eventID);
  }

}
