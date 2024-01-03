import { Component, OnInit } from '@angular/core';
import { LoginObject } from './LoginObject';
import { PostServiceService } from 'src/app/Service/post-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Service/alert.service';
import { AuthService } from 'src/app/Service/auth.service';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  SignIn: boolean = true;

  loginObject: any;
  labels = UserDefinedLabels;
  responseObject: any;
  constructor(private service$: PostServiceService, private router: Router, private alertService: AlertService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.loginObject = new LoginObject();
  }

  SignIN() {
    if (this.loginObject.username && this.loginObject.username.endsWith('@umbc.edu')) {
      this.service$.LoginUser(this.loginObject).subscribe(
        (data: any) => {
          if (data && data[this.labels.result] && data[this.labels.result].length > 0) {
            this.handleSuccessfulLogin(data[this.labels.result][0]);
          } else {
            this.handleLoginFailure("Login Failed");
          }
        },
        (error: any) => {
          this.handleLoginFailure("Login Failed");
        }
      );
    } 
    else {
      this.alertService.showAlert("Error", 'Invalid email address. Please use an @umbc.edu  email.', () => {});
    }

  }
  
  handleSuccessfulLogin(responseObject: any) {
    sessionStorage.setItem('userObject', JSON.stringify(responseObject));
    sessionStorage.setItem('userID', responseObject.userID);
    sessionStorage.setItem('userName', responseObject.username);
    sessionStorage.setItem('currentUserRole', responseObject.roleName);
    sessionStorage.setItem('access_token', responseObject.token);
    this.authService.setData(responseObject.roleName);
  
    if (responseObject.roleName == 'Admin') {
      this.router.navigateByUrl("/leaderBoard");
    } else if (responseObject.roleName == 'Volunteer') {
      this.router.navigateByUrl("/upComingEvent");
    }
  
    console.log('Login done Successfully!');
  }
  
  handleLoginFailure(errorMessage: string) {
    this.alertService.showAlert("Error", errorMessage, () => {});
    console.log('Login Failed!');
  }
  
}


export function umbcEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value as string;

    // Check if the email ends with '@umbc.edu '
    if (email && !email.toLowerCase().endsWith('@umbc.edu ')) {
      return { umbcEmail: true };
    }

    return null;
  };
}
