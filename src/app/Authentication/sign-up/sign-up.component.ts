import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Service/alert.service';
import { PostServiceService } from 'src/app/Service/post-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';
import { UserObject } from './UserObject';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { EMPTY, exhaustMap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUPComponent implements OnInit {
  loginObject: any;
  labels = UserDefinedLabels;
  RoleList: any[] = ['Volunteer'];
  GenderList: any[] = ['Female', 'Male', 'Other'];
  responseObject: any;
  selectedDate: Date | undefined | null;
  maxDate: Date | undefined;
  constructor(private service$: PostServiceService, private datePipe: DatePipe,
    private router: Router, private alertService: AlertService, private dateAdapter: DateAdapter<Date>) {
    this.maxDate = this.dateAdapter.today();
  }
  ngOnInit(): void {
    this.loginObject = new UserObject();
  }

  dateChanged(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value;
  }

  passwordsMatch(): boolean {
    return this.loginObject.userPassword === this.loginObject.Re_userPassword;
  }

  SignUp() {
    if (this.loginObject.userEmail && this.loginObject.userEmail.endsWith('@umbc.edu')) {
    this.loginObject.dOB = this.datePipe.transform(this.selectedDate, 'dd-MM-yyyy');
    this.loginObject.accountStatus = 'Active';
    this.loginObject.gender = 'Male';
    console.log('this.loginObject', this.loginObject);
    if (this.loginObject.userPassword !== this.loginObject.Re_userPassword) {
      this.alertService.showAlert("Process", 'Password Not Match. Please Correct Password', () => { });
      return;
    }

    this.service$
      .createUser(this.loginObject)
      .pipe(
        exhaustMap(data => {

          if (data && data['statusCode'] == '500') {
            this.alertService.showAlert("Process", data['statusMessage'], () => {});
          }

          if (data && data['statusCode'] == '200') {
            this.responseObject = data['result'];
            this.alertService.showAlert("Success", data['statusMessage'], () => {
              this.router.navigateByUrl("/login");
            });
            console.log('Sign Up done Successfully!');
          } else {
            console.log('Sign Up Failed!');
          }
          return EMPTY; // Return an empty observable to signify completion
        })
      )
      .subscribe(
        () => {
          // This block will be executed when the inner observable is completed
        },
        error => {
          this.alertService.showAlert("Error", 'Sign up error!', () => {
          });
        });
    } else {
      this.alertService.showAlert("Error", 'Invalid email address. Please use an @umbc.edu  email.', () => {});
    }
  }
}
