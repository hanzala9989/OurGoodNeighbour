import { LocationStrategy } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/Service/alert.service';
import { DeleteServiceService } from 'src/app/Service/delete-service.service';
import { GetServiceService } from 'src/app/Service/get-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  displayedColumns: string[] = ['userID', 'userName', 'userEmail', 'roleName', 'phoneNumber', 'action'];
  dataSource: any;
  labels = UserDefinedLabels;
  @ViewChild(MatPaginator) paginator?: MatPaginator
  @ViewChild(MatSort) sort?: MatSort;


  responseData: any[] = [];
  levels: any | undefined;
  userObject: any | undefined;

  constructor(private service$: GetServiceService, private deleteService$: DeleteServiceService,
    private location: LocationStrategy,
    private alertService: AlertService) {
    history.pushState(null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, window.location.href);
      this.levels = 'search'
      this.getAllUser();

    });
  }

  goBack() {
    this.levels = 'search';
    this.getAllUser();
    console.log('Navigating back...');
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAllUser();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllUser() {
    this.responseData = [];
    this.service$.searchUser(10, 1).subscribe(data => {
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

  editUser(element: any) {
    this.levels = 'edit';
    this.userObject = element;
  }

  deleteUser(element: any) {
    this.deleteService$.deleteUserByID(element.userID).subscribe(data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.alertService.showAlert("Success", data['statusMessage'], () => {
          this.getAllUser();
        });
      } else {
        this.alertService.showAlert("Error", data['statusMessage'], () => {
        });
      }
    });
  }
}
