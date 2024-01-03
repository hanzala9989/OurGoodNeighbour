import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/Service/alert.service';
import { DeleteServiceService } from 'src/app/Service/delete-service.service';
import { GetServiceService } from 'src/app/Service/get-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';

@Component({
  selector: 'app-reward-history',
  templateUrl: './reward-history.component.html',
  styleUrls: ['./reward-history.component.scss']
})
export class RewardHistoryComponent {
  displayedColumns: string[] = ['eventID', 'eventName', 'eventDate', 'rewardPoint', 'eventVenue'];
  dataSource: any;
  labels = UserDefinedLabels;
  @ViewChild(MatPaginator) paginator?: MatPaginator
  @ViewChild(MatSort) sort?: MatSort;

  levels: any | undefined;
  userObject: any | undefined;
  UserAssignedList: any;
  userEventObjectList: any;

  constructor() { }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    const userEventObjectList: any = sessionStorage.getItem("userObject");
    const userEvent = JSON.parse(userEventObjectList);
    this.userEventObjectList = userEvent.joiningEventUser;
    this.dataSource.data = this.userEventObjectList;
  }

  getTotalPoint() {
    return this.userEventObjectList.map((t: any) => t.rewardPoint).reduce((acc: any, value: any) => acc + value, 0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
