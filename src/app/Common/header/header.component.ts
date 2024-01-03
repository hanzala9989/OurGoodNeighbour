import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  userObject: any | null;
  loginFlag: boolean = true;
  currentRoleFlag: boolean = true;
  currentUserRole: string | null | undefined;
  isAdmin: boolean = false;
  isVolunteer: boolean = false;

  constructor(private authService$: AuthService, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.data$.subscribe(data => {
      this.currentUserRole = data !== null ? data : sessionStorage.getItem("currentUserRole");
      console.log('this.currentUserRole',this.currentUserRole);

      if (this.currentUserRole == 'Admin') {
        this.isAdmin = true;
      }
      if (this.currentUserRole == 'Volunteer') {
        this.isVolunteer = true;
      }
      
    });
    if (this.authService$.getUserRole()) {
      if (this.currentUserRole === 'Admin') {
        this.currentRoleFlag = true;
        this.loginFlag = false;
      }
      if (this.currentUserRole === 'Volunteer') {
        this.currentRoleFlag = true;
        this.loginFlag = false;
      }
    }
  }

  ngOnChanges() {

  }

  logout() {
    this.currentRoleFlag = false;
    this.userObject = null;
    sessionStorage.clear();
    location.reload();
  }
}
