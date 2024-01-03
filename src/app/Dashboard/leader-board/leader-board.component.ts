import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetServiceService } from 'src/app/Service/get-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rank', 'userName', 'rewardPoint', 'rewardName'];
  dataSource: any;
  labels = UserDefinedLabels;
  @ViewChild(MatPaginator) paginator?: MatPaginator
  @ViewChild(MatSort) sort?: MatSort;
  noDataFoundFlag: boolean = false;

  responseData: any[] = [];
  levels: any | undefined;
  rewardObject: any | undefined;


  constructor(private service$: GetServiceService) { }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.GetLeaderBoardDetails();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.responseData);
    this.dataSource.sort = this.sort;

  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    this.dataSource = new MatTableDataSource(this.responseData);
    this.dataSource.sort = this.sort;

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetLeaderBoardDetails() {
    this.service$.getLeaderBoardDetails().subscribe(data => {
      if (data[UserDefinedLabels.result][0].length === 0) {
        this.noDataFoundFlag = true;
      } else {
        this.noDataFoundFlag = false;
      }
      if (data && data['statusCode'] === UserDefinedLabels.StatusCode_200 && data[UserDefinedLabels.result] && data[UserDefinedLabels.result].length > 0) {
        this.responseData = data[UserDefinedLabels.result][0];
        this.dataSource.data = this.responseData;
      } else {
        this.responseData = [];
      }
    })
  }
}
