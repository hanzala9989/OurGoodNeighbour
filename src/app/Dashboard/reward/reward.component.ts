import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Service/alert.service';
import { PostServiceService } from 'src/app/Service/post-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';
import { RewardObject } from './RewardObject';
import { PutServiceService } from 'src/app/Service/put-service.service';
import { DateAdapter } from '@angular/material/core';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  saveRewardObject: any;
  labels = UserDefinedLabels;
  selectedDate: any;
  responseObject: any[] = [];
  rewardAvailabilityList: any[] = ['Available', 'Limited Quantity', 'Out of Stock'];
  rewardTypeList: any[] = ['Discount', 'Gift ', 'Voucher', 'Electronics', 'Entertainment', 'Home & Kitchen'];
  minDate: Date | undefined;
  selectedDates: Date | undefined;

  @Input() level: any;
  @Input() rewardObject: any;
  @Output() goBackEvent = new EventEmitter<void>();
  centered = false;
  disabled = false;
  unbounded = false;

  goBack(){
    this.goBackEvent.emit();
  }

  constructor(private service$: PostServiceService, private editService$: PutServiceService,
    private datePipe: DatePipe, private dateAdapter: DateAdapter<Date>, private commonService:CommonService,
    private router: Router, private alertService: AlertService) {
      this.minDate = this.dateAdapter.today();
  }

  ngOnInit(): void {
    this.saveRewardObject = new RewardObject();
    const defaultDate = this.commonService.getDefaultDate();
    this.selectedDates = new Date(defaultDate);
    console.log(`Default Date: ${defaultDate}`);

    if (this.level === 'edit') {
      this.saveRewardObject = this.rewardObject;
      const defaultDate = this.commonService.getDefaultDate();
      this.selectedDate = new Date(defaultDate);
    }
  }


  dateChanged(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = this.commonService.getDefaultDate();
  }

  saveReward() {
    this.saveRewardObject.userID = sessionStorage.getItem('userID');
    this.saveRewardObject.expirationDate = this.datePipe.transform(this.selectedDates, 'dd-MM-yyyy');
    console.log('this.saveRewardObject :: ', this.saveRewardObject);

    this.service$.createReward(this.saveRewardObject).subscribe(data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        this.alertService.showAlert("Success", data['statusMessage'], () => {
          this.router.navigateByUrl("/searchReward");
        });
        console.log('Reward Add Succesfully!');
      } else {
        this.alertService.showAlert("Error", data['statusMessage'], () => { });
        console.log('Reward Adding Faild!');
      }
    },
      error => {
        this.alertService.showAlert("Error", 'Error Adding Reward :: ' + error, () => { });
      });
  }

  updateReward() {
    this.saveRewardObject.userID =  sessionStorage.getItem('userID');
    this.saveRewardObject.expirationDate = this.datePipe.transform(this.selectedDates, 'dd-MM-yyyy');
    console.log('this.saveRewardObject :: ', this.saveRewardObject);

    this.editService$.editReward(this.saveRewardObject).subscribe(data => {
      if (data && data['statusCode'] === UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        this.alertService.showAlert("Success", data['statusMessage'], () => {
          // this.router.navigateByUrl("/searchReward");
          location.reload();
        });
        console.log('Reward Add Succesfully!');
      } else {
        this.alertService.showAlert("Error", data['statusMessage'], () => { });
        console.log('Reward Adding Faild!');
      }
    },
      error => {
        this.alertService.showAlert("Error", 'Error Adding Reward :: ' + error, () => { });
      });
  }
}
