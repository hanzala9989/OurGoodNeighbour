import { DatePipe, LocationStrategy } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/Service/alert.service';
import { CommonService } from 'src/app/Service/common.service';
import { DeleteServiceService } from 'src/app/Service/delete-service.service';
import { GetServiceService } from 'src/app/Service/get-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.scss']
})
export class SearchEventComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['eventID', 'eventName', 'eventDate', 'numberOfVolunter', 'registerOfVolunter', 'action'];
  dataSource: any;
  labels = UserDefinedLabels;
  @ViewChild(MatPaginator) paginator?: MatPaginator
  @ViewChild(MatSort) sort?: MatSort;

  levels: any | undefined;
  eventObject: any | undefined;

  responseData: any[] = [];
  constructor(private service$: GetServiceService, private deleteService$: DeleteServiceService,
    private location: LocationStrategy, public commonService: CommonService,
    private alertService: AlertService) {
    history.pushState(null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, window.location.href);
      this.levels = 'search';
      this.getAllEvent();
    });
  }
  goBack() {
    this.levels = 'search';
    this.getAllEvent();
    console.log('Navigating back...');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAllEvent();
  }

  getAllEvent() {
    this.responseData = [];
    this.service$.searchEvent(10, 1).subscribe(data => {
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

  editEvent(element: any) {
    this.levels = 'edit';
    this.eventObject = element;
  }

  deleteEvent(element: any) {
    this.deleteService$.deleteEventByID(element.eventID).subscribe(data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.alertService.showAlert("Success", data['statusMessage'], () => {
          this.getAllEvent();
        });
      } else {
        this.alertService.showAlert("Error", data['statusMessage'], () => {
        });
      }
    });
  }
}
