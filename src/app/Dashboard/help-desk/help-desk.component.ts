import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Service/alert.service';
import { PostServiceService } from 'src/app/Service/post-service.service';
import { PutServiceService } from 'src/app/Service/put-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';
import { ContactObject } from './ContactObject';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetServiceService } from 'src/app/Service/get-service.service';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss']
})
export class HelpDeskComponent implements OnInit {

  saveContactObject: any;
  labels = UserDefinedLabels;
  selectedDate: any;
  responseObject: any[] = [];
  ContactAvailabilityList: any[] = ['Available', 'Limited Quantity', 'Out of Stock'];
  ContactTypeList: any[] = ['Discount', 'Gift ', 'Voucher', 'Electronics', 'Entertainment', 'Home & Kitchen'];


  @Input() level: any;
  @Input() contactObject: any;
  historyMessage: string | undefined;
  replyMessage: string | undefined;
  username: any;
  currentRole: string | null | undefined;
  @Output() goBackEvent = new EventEmitter<void>();
  centered = false;
  disabled = false;
  unbounded = false;
  userResponseData: any = {};
  userName: string | undefined | null;

  goBack() {
    this.goBackEvent.emit();
  }
  constructor(
    private service$: PostServiceService, private editService$: PutServiceService,
    private _snackBar: MatSnackBar, private getService$: GetServiceService,
    private router: Router, private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.currentRole = sessionStorage.getItem("currentUserRole");
    this.saveContactObject = new ContactObject();
    if (this.level === 'edit') {
      this.saveContactObject = this.contactObject;
      this.getUserByID(this.saveContactObject.userID);
      setTimeout(() => {
        this.historyMessage = this.makeRolesBold('Volunteer' + this.saveContactObject.message);
      }, 1000);
      const userObjectStr: string | null = sessionStorage.getItem('userObject');
      const userObject: any | null = userObjectStr ? JSON.parse(userObjectStr) : null;
      this.username = userObject.username;
    }
  }


  openToast(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['custom-toast-class'], // Add your custom class here
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }


  saveContact() {
    this.saveContactObject.email = 'eventAdmin@umbc.edu ';
    this.saveContactObject.userID = sessionStorage.getItem('userID');
    console.log('this.saveContactObject :: ', this.saveContactObject);

    this.service$.createContact(this.saveContactObject).subscribe(data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        this.openToast(data['statusMessage']);
        if (this.currentRole == UserDefinedLabels.Volunteer) {
          this.router.navigateByUrl("/upComingEvent");
        } else {
          this.router.navigateByUrl("/leaderBoard");
        }
        console.log('Contact Add Succesfully!');
      } else {
        this.alertService.showAlert("Error", data['statusMessage'], () => { });
        console.log('Contact Adding Faild!');
      }
    },
      error => {
        this.alertService.showAlert("Error", 'Error Adding Contact :: ' + error, () => { });
      });
  }

  updateContact() {
    this.saveContactObject.email = 'eventAdmin@umbc.edu ';
    this.saveContactObject.role = sessionStorage.getItem('currentUserRole');
    this.saveContactObject.message = this.replyMessage;
    this.editService$.editContact(this.saveContactObject).subscribe(data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        this.openToast(data['statusMessage']);
        if (this.currentRole == UserDefinedLabels.Volunteer) {
          this.router.navigateByUrl("/upComingEvent");
        } else {
          this.router.navigateByUrl("/leaderBoard");
        }
        console.log('Contact Add Succesfully!');
      } else {
        this.alertService.showAlert("Error", data['statusMessage'], () => { });
        console.log('Contact Adding Faild!');
      }
    },
      error => {
        this.alertService.showAlert("Error", 'Error Adding Contact :: ' + error, () => { });
      });
  }

  makeRolesBold(text: string): string {
    const roles = ['Volunteer', 'Admin'];
    const userObjectStr: string | null = sessionStorage.getItem('userObject');
    const userObject: { username: string } | null = userObjectStr ? JSON.parse(userObjectStr) : null;
    console.log('this.userName', this.userResponseData);

    if (userObject) {
      roles.forEach(role => {
        let regex = new RegExp(role, 'g');
        let roleName = role === 'Admin' ? role : role === 'Volunteer' ? this.userName : '';
        text = text.replace(regex, `<br><br><b class="bold-text">${roleName} : </b><br>`);
      });
    }
    return text;
  }

  getUserByID(userID: any) {
    this.getService$.getUserByID(userID).subscribe(data => {
      this.userResponseData = data['result'][0];
      this.userName = this.userResponseData.username;
      console.log('this.userName---------->', this.userName);
    });
  }

}
