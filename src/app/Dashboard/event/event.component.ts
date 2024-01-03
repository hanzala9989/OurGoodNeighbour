import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Service/alert.service';
import { GetServiceService } from 'src/app/Service/get-service.service';
import { PostServiceService } from 'src/app/Service/post-service.service';
import { PutServiceService } from 'src/app/Service/put-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';
import { UserAssignedEvent } from './UserAssignedEvent';
import { DeleteServiceService } from 'src/app/Service/delete-service.service';
import { DateAdapter } from '@angular/material/core';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  saveEventObject: any = {};
  labels = UserDefinedLabels;
  selectedDate: any | undefined;
  responseObject: any[] = [];
  minDate: Date | undefined;
  displayedColumns: string[] = ['userID', 'userName', 'roleName', 'rewardPoint', 'userAttended', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator
  @ViewChild(MatSort) sort?: MatSort;
  @Input() level: any;
  @Input() eventObject: any;
  userObjectList: any[] = [];
  userAssign: any;
  eventObjectList: any[] = [];
  currentRole: string | null | undefined;
  maxDate: Date | undefined;
  @Output() goBackEvent = new EventEmitter<void>();
  centered = false;
  disabled = false;
  unbounded = false;

  goBack() {
    this.goBackEvent.emit();
  }

  constructor(private service$: PostServiceService, private datePipe: DatePipe,
    private router: Router,
    private editService$: PutServiceService,
    private getservice$: GetServiceService,
    private common$: CommonService,
    private dateAdapter: DateAdapter<Date>,
    private deleteservice$: DeleteServiceService,
    private alertService: AlertService) {
    this.minDate = new Date(this.common$.getDefaultDate());
    this.maxDate = this.dateAdapter.today();
  }



  ngOnInit(): void {
    this.currentRole = sessionStorage.getItem("currentUserRole");
    this.userAssign = new UserAssignedEvent();
    this.dataSource = new MatTableDataSource();
    if (this.level === 'edit') {
      this.saveEventObject = this.eventObject;

      const defaultDate = this.saveEventObject.eventDate;
      const dateParts = defaultDate.split('-');
      this.selectedDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      this.getAllUserFromEvent(this.saveEventObject.eventID);
    }
  }

  dateChanged(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value;
  }


  saveEvent() {
    this.saveEventObject.eventDate = this.datePipe.transform(this.selectedDate, 'dd-MM-yyyy');
    console.log("saveEventObject :: ", this.saveEventObject);
    this.service$.createEvent(this.saveEventObject).subscribe(data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        this.alertService.showAlert("Success", data['statusMessage'], () => {
          this.router.navigateByUrl("/searchEvent");
        });
      } else {
        this.alertService.showAlert("Error", data['statusMessage'], () => { });
      }
    },
      error => {
        this.alertService.showAlert("Error", 'Error Adding Event :: ' + error, () => { });
      });
  }

  updateEvent() {
    // this.saveEventObject.eventDate = this.datePipe.transform(this.selectedDate, 'dd-MM-yyyy');
    console.log("updateEventObject :: ", this.saveEventObject);
    this.editService$.editEvent(this.saveEventObject).subscribe(data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        this.alertService.showAlert("Success", data['statusMessage'], () => {
          if (this.currentRole == UserDefinedLabels.Volunteer) {
            this.router.navigateByUrl("/upComingEvent");
          } else {
            this.router.navigateByUrl("/leaderBoard");
          }
        });
      } else {
        this.alertService.showAlert("Error", data['statusMessage'], () => { });
      }
    },
      error => {
        this.alertService.showAlert("Error", 'Error Adding Event :: ' + error, () => { });
      });
  }

  getAllUserFromEvent(eventID: any) {
    console.log('eventID ::', eventID);

    this.getservice$.getAllUserFromEvent(eventID).subscribe(data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.userObjectList = data['result'][0];
        this.getAllUserEventsByID(this.saveEventObject.eventID);

      } else {
        this.userObjectList = [];
      }
    },
      error => {
        this.alertService.showAlert("Error", 'Error Adding Event :: ' + error, () => { });
      });
  }


  getAllUserEventsByID(eventID: any) {
    console.log('eventID :: getAllUserEventsByID ::', typeof eventID);

    this.getservice$.getAllUserEventsByID(eventID).subscribe(data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.eventObjectList = data['result'][0];
        this.userObjectList = this.addAttendanceToUsers(this.userObjectList, this.eventObjectList);
        this.dataSource.data = this.userObjectList;

      } else {
        this.eventObjectList = [];
        this.dataSource.data = this.userObjectList;
      }
    },
      error => {
        this.alertService.showAlert("Error", 'Error Adding Event :: ' + error, () => { });
      });
  }

  removeUserEvent(element: any) {
    let eventID = this.eventObject.eventID;
    let userID = element.userID;
    this.deleteservice$.deleteUserFromEvent(userID, eventID).subscribe(data => {
      if (data['statusCode'] === UserDefinedLabels.StatusCode_200) {
        this.alertService.showAlert("Success", data['statusMessage'], () => {
          this.getAllUserFromEvent(this.saveEventObject.eventID);
        });
      } else {
        this.alertService.showAlert("Error", data['statusMessage'], () => {
          this.getAllUserFromEvent(this.saveEventObject.eventID);
        });
      }
    })
  }

  processUserEvent(element: any) {
    this.userAssign.eventID = this.eventObject.eventID;
    this.userAssign.userID = element.userID;
    if (element.userAttended) {
      this.service$.processUserFromEvent(this.userAssign).subscribe(data => {
        if (data["statusCode"] === UserDefinedLabels.StatusCode_200) {
          this.alertService.showAlert("Success", 'User Marked as Attended !', () => {
            this.getAllUserFromEvent(this.saveEventObject.eventID);
          });
        }
      });
    } else {
      this.alertService.showAlert("Error", 'Please check the checkbox to mark as Attented !', () => {
        this.getAllUserFromEvent(this.saveEventObject.eventID);
      });
    }
  }

  setAll(completed: boolean) {    
    this.userAssign.attendend = completed;
  }

  addAttendanceToUsers(users: any[], attendance: any[]): any[] {
    const updatedUsers = users.map((user) => {
      const matchingAttendance = attendance.find((a) => a.userID === user.userID);
      if (matchingAttendance) {
        user.attendend = matchingAttendance.attendend === null ? false : true;
      }
      return user;
    });

    return updatedUsers;
  }
}

