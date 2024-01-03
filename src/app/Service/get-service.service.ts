import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlContant } from 'src/assets/Url-Contant';

@Injectable({
  providedIn: 'root'
})
export class GetServiceService {
  userDefinedURLs = UrlContant;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.userDefinedURLs = new UrlContant();
  }


  searchUser(pageSize: number, pageNumber: number): Observable<any> {
    return this.http.get(this.userDefinedURLs.SearchUserUrl + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber);
  }

  searchEvent(pageSize: number, pageNumber: number): Observable<any> {
    return this.http.get(this.userDefinedURLs.SearchEventUrl + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber);
  }

  searchReward(pageSize: number, pageNumber: number): Observable<any> {
    return this.http.get(this.userDefinedURLs.SearchRewardUrl + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber);
  }

  searchContact(pageSize: number, pageNumber: number): Observable<any> {
    return this.http.get(this.userDefinedURLs.SearchContactUrl + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber);
  }

  // *************************************************************************

  getUserByID(userID: number): Observable<any> {
    return this.http.get(this.userDefinedURLs.GetUserByIDUrl + '?userID=' + userID);
  }

  getRoleByID(roleID: string): Observable<any> {
    return this.http.get(this.userDefinedURLs.GetRoleByIDUrl + '?roleID=' + roleID);
  }

  getEventByID(eventID: string): Observable<any> {
    return this.http.get(this.userDefinedURLs.GetEventByIDUrl + '?eventID=' + eventID);
  }

  getRewardByID(rewardID: string): Observable<any> {
    return this.http.get(this.userDefinedURLs.GetRewardByIDUrl + '?rewardID=' + rewardID);
  }

  getContactByID(contactID: string): Observable<any> {
    return this.http.get(this.userDefinedURLs.GetContactByIDUrl + '?contactID=' + contactID);
  }

  getAllUserFromEvent(eventID: string): Observable<any> {
    return this.http.get(this.userDefinedURLs.getAllUserFromEventUrl + '?eventID=' + eventID);
  }

  getAllUserEventsByID(eventID: string): Observable<any> {
    return this.http.get(this.userDefinedURLs.getAllUserEventsByIDUrl + '?eventID=' + eventID);
  }

  getAllUserAssignedList(userID: number): Observable<any> {
    return this.http.get(this.userDefinedURLs.getAllUserAssignedListUrl + '?userID=' + userID);
  }
  // *******************************************************************************************************************

  getLeaderBoardDetails(): Observable<any> {
    return this.http.get(this.userDefinedURLs.GetLeaderBoardDetailsUrl);
  }

  getAllRewardHistory(): Observable<any> {
    return this.http.get(this.userDefinedURLs.getAllRewardHistoryUrl);
  }

  getAllUserEvent(): Observable<any> {
    return this.http.get(this.userDefinedURLs.getAllUserEventUrl);
  }

  assignUserEvent(userID: number, eventID: number): Observable<any> {
    return this.http.get(this.userDefinedURLs.AssignUserEventUrl + '?userID=' + userID + '&eventID=' + eventID);
  }

}
