// auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  constructor() {
    // You can initialize data in the constructor if needed.
  }

  setData(newData: any) {
    this.dataSubject.next(newData);
  }

  login(username: string, password: string) {
    // Perform authentication logic, e.g., make an API call
    // If authentication is successful, set the user role in sessionStorage
    sessionStorage.setItem('currentUserRole', 'user'); // or 'admin' based on your logic
  }

  logout() {
    // Remove the user role from sessionStorage
    sessionStorage.removeItem('currentUserRole');
  }

  getUserRole(): string {
    const currentUserRole: any = sessionStorage.getItem('currentUserRole')
    return currentUserRole;
  }

  isLoggedIn(): boolean {
    return this.getUserRole() !== null;
  }
}
