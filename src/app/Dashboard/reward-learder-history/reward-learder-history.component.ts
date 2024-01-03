import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetServiceService } from 'src/app/Service/get-service.service';
import { PostServiceService } from 'src/app/Service/post-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';

@Component({
  selector: 'app-reward-learder-history',
  templateUrl: './reward-learder-history.component.html',
  styleUrls: ['./reward-learder-history.component.scss']
})
export class RewardLearderHistoryComponent {
  displayedColumns: string[] = ['rank', 'userName', 'rewardName', 'totalRewardPoint', 'season'];
  dataSource: any;
  labels = UserDefinedLabels;
  @ViewChild(MatPaginator) paginator?: MatPaginator
  @ViewChild(MatSort) sort?: MatSort;

  filterObject: any = {};

  SeasonList: any[] = ['Spring','Summer','Fall','Winter'];
  responseData: any[] = [];
  levels: any | undefined;
  userObject: any | undefined;

  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  selectedYear: number | undefined | null;
  constructor(private service$: GetServiceService,private postService$:PostServiceService) { }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAllUser();
  }

  getAllUser() {
    this.service$.getAllRewardHistory().subscribe(data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200 && data['result'] && data['result'].length > 0) {
        this.responseData = data['result'][0].sort((a: any, b: any) => a.rank - b.rank);
        this.responseData = this.responseData.filter(ele => ele.totalRewardPoint != 0);
        this.dataSource.data = this.responseData;
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

  filterRewardHistory(){
   this.postService$.filterRewardHistory(this.filterObject).subscribe(data=>{
    if (data['statusCode'] == UserDefinedLabels.StatusCode_200 && data['result'] && data['result'].length > 0) {
      this.responseData = data['result'][0];
      this.dataSource.data = this.responseData;
    }
   }); 
  }
}
