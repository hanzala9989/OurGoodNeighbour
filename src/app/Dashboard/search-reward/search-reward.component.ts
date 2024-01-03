import { LocationStrategy } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/Service/alert.service';
import { CommonService } from 'src/app/Service/common.service';
import { DeleteServiceService } from 'src/app/Service/delete-service.service';
import { GetServiceService } from 'src/app/Service/get-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';

@Component({
  selector: 'app-search-reward',
  templateUrl: './search-reward.component.html',
  styleUrls: ['./search-reward.component.scss']
})
export class SearchRewardComponent implements OnInit {

  displayedColumns: string[] = ['rewardID', 'rewardName', 'rewardType', 'rewardAvailability', 'expireDate', 'action'];
  dataSource: any;
  labels = UserDefinedLabels;
  @ViewChild(MatPaginator) paginator?: MatPaginator
  @ViewChild(MatSort) sort?: MatSort;


  responseData: any[] = [];
  levels: any | undefined;
  rewardObject: any | undefined;

  constructor(private service$: GetServiceService, private deleteService$: DeleteServiceService,
    private location: LocationStrategy, public commonService: CommonService,
    private alertService: AlertService) {
    history.pushState(null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, window.location.href);
      this.levels = 'search'
      this.getAllReward();

    });
  }

  goBack() {
    this.levels = 'search';
    this.getAllReward();
    console.log('Navigating back...');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAllReward();
  }

  getAllReward() {
    this.responseData = [];
    this.service$.searchReward(10, 1).subscribe(data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200 && data['result'] && data['result'].length > 0) {
        this.responseData = data['result'][0];
        this.dataSource.data = this.responseData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.responseData = [];
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editReward(element: any) {
    this.levels = 'edit';
    this.rewardObject = element;
  }

  deleteReward(element: any) {
    this.deleteService$.deleteRewardByID(element.rewardID).subscribe(data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.alertService.showAlert("Success", data['statusMessage'], () => {
          this.getAllReward();
        });
      } else {
        this.alertService.showAlert("Error", data['statusMessage'], () => {
        });
      }
    });
  }
}
