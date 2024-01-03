import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UserDefinedLabels } from 'src/assets/labelsConstant';
import { UserObject } from './userObject';
import { AlertService } from 'src/app/Service/alert.service';
import { PutServiceService } from 'src/app/Service/put-service.service';
import { PostServiceService } from 'src/app/Service/post-service.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DateAdapter } from '@angular/material/core';
import { GetServiceService } from 'src/app/Service/get-service.service';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  saveUserObject: any;
  labels = UserDefinedLabels;
  selectedDate: any;
  responseObject: any[] = [];
  RoleList: any[] = ['Admin', 'Volunteer'];
  GenderList: any[] = ['Female', 'Male', 'Other'];
  statusList: any[] = ['Active', 'InActive'];

  displayedColumns: string[] = ['eventID', 'eventName', 'eventDate', 'rewardPoint', 'eventVenue'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator
  @ViewChild(MatSort) sort?: MatSort;

  @Input() level: any;
  @Input() userObject: any;
  EventUserList: any[] = [];
  userEventObjectList: any[] = [];
  minDate: Date | undefined;
  selectedDates: Date | undefined;
  currentRole: string | null | undefined;
  @Output() goBackEvent = new EventEmitter<void>();
  centered = false;
  disabled = false;
  unbounded = false;

  goBack() {
    this.goBackEvent.emit();
  }
  constructor(
    private service$: PostServiceService, private editService$: PutServiceService,
    private getService$: GetServiceService, public commonService: CommonService,
    private datePipe: DatePipe, private dateAdapter: DateAdapter<Date>,
    private router: Router, private alertService: AlertService
  ) {
    this.minDate = this.dateAdapter.today();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.saveUserObject = new UserObject();
    this.dataSource = new MatTableDataSource();
    this.currentRole = sessionStorage.getItem("currentUserRole");

    if (this.level === 'edit' || this.level === 'profile') {
      this.saveUserObject = this.userObject;
      const defaultDate = this.saveUserObject.dOB;
      const dateParts = defaultDate.split('-');
      this.selectedDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      console.log(this.selectedDate);
      this.EventUserList = this.saveUserObject.joiningEventUser;
      this.userEventObjectList = this.EventUserList;
      this.dataSource.data = this.EventUserList;
    }
  }

  dateChanged(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value;
  }

  saveUser() {
    console.log('this.saveUserObject :: ', this.saveUserObject);
    this.saveUserObject.dOB = this.datePipe.transform(this.selectedDate, 'dd-MM-yyyy');
    this.saveUserObject.accountStatus = 'Active'
    if (this.saveUserObject.userEmail && this.saveUserObject.userEmail.endsWith('@umbc.edu')) {
      this.service$.createUser(this.saveUserObject).subscribe(data => {
        if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
          this.responseObject = data['result'];
          this.alertService.showAlert("Success", data['statusMessage'], () => {
            this.router.navigateByUrl("/searchUser");
          });
        } else {
          this.alertService.showAlert("Error", data['statusMessage'], () => { });
        }
      },
        error => {
          this.alertService.showAlert("Error", 'Error Adding User :: ' + error, () => { });
        });
    } else {
      this.alertService.showAlert("Error", 'Invalid email address. Please use an @umbc.edu  email.', () => { });
    }

  }

  updateuser() {
    this.saveUserObject.dOB = this.datePipe.transform(this.selectedDate, 'dd-MM-yyyy');
    console.log('this.saveUserObject :: ', this.saveUserObject);

    if (this.saveUserObject.userEmail && this.saveUserObject.userEmail.endsWith('@umbc.edu')) {
      this.editService$.editUser(this.saveUserObject).subscribe(data => {
        if (data && data['statusCode'] === UserDefinedLabels.StatusCode_200) {
          this.responseObject = data['result'];
          let that = this;
          this.alertService.showAlert("Success", data['statusMessage'], () => {
            if (that.level == 'profile') {
              that.getUserbyID();
            }
            if (that.level == 'edit') {
              location.reload();
              // that.router.navigateByUrl("/l");
            }
          });
        } else {
          this.alertService.showAlert("Error", data['statusMessage'], () => { });
        }
      },
        error => {
          this.alertService.showAlert("Error", 'Error Adding User :: ' + error, () => { });
        });
    } else {
      this.alertService.showAlert("Error", 'Invalid email address. Please use an @umbc.edu  email.', () => { });
    }


  }

  getUserbyID() {
    const userID: number = Number(sessionStorage.getItem('userID'));
    this.getService$.getUserByID(userID).subscribe(data => {
      if (data && data['statusCode'] === UserDefinedLabels.StatusCode_200) {
        const responseObject: any = data['result'][0];
        sessionStorage.setItem('userObject', JSON.stringify(responseObject));
        sessionStorage.setItem('userID', responseObject.userID);
        sessionStorage.setItem('currentUserRole', responseObject.roleName);
        if (this.currentRole == UserDefinedLabels.Volunteer) {
          this.router.navigateByUrl("/upComingEvent");
        } else {
          this.router.navigateByUrl("/leaderBoard");
        };
      }
    });
  }

}
