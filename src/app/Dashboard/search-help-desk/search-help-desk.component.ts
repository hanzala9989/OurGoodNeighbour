import { LocationStrategy } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/Service/alert.service';
import { DeleteServiceService } from 'src/app/Service/delete-service.service';
import { GetServiceService } from 'src/app/Service/get-service.service';
import { UserDefinedLabels } from 'src/assets/labelsConstant';

@Component({
  selector: 'app-search-help-desk',
  templateUrl: './search-help-desk.component.html',
  styleUrls: ['./search-help-desk.component.scss']
})
export class SearchHelpDeskComponent {
  displayedColumns: string[] = ['userID', 'email', 'subject', 'message', 'action'];
  dataSource: any;
  labels = UserDefinedLabels;
  @ViewChild(MatPaginator) paginator?: MatPaginator
  @ViewChild(MatSort) sort?: MatSort;


  responseData: any[] = [];
  levels: any | undefined;
  contactObject: any | undefined;
  roleName: any | undefined;

  constructor(private service$: GetServiceService, private deleteService$: DeleteServiceService,
    private location: LocationStrategy,
    private alertService: AlertService) {
    history.pushState(null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, window.location.href);
      this.levels = 'search';
      this.getAllContact();

    });
  }
  goBack() {
    this.levels = 'search';
    this.getAllContact();
    console.log('Navigating back...');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAllContact();
    this.roleName = sessionStorage.getItem('currentUserRole');
  }

  getAllContact() {
    const roleName = sessionStorage.getItem('currentUserRole');
    let userIdFilter: number | undefined;

    if (roleName !== 'Admin') {
      const userID = sessionStorage.getItem('userID');
      userIdFilter = userID ? Number(userID) : undefined;
    }
    this.responseData = [];
    this.service$.searchContact(10, 1).subscribe(data => {
      if (data['statusCode'] === UserDefinedLabels.StatusCode_200 && data['result'] && data['result'].length > 0) {
        if (roleName === 'Admin') {
          this.responseData = data['result'][0];
        } else {
          this.responseData = data['result'][0].filter((contact: any) => contact.userID == userIdFilter);
        }

        this.dataSource.data = this.responseData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
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

  editContact(element: any) {
    this.levels = 'edit';
    this.contactObject = element;
  }

  deleteContact(element: any) {
    this.deleteService$.deleteContactByID(element.contactID).subscribe(data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.alertService.showAlert("Success", data['statusMessage'], () => {
          this.getAllContact();
        });
      } else {
        this.alertService.showAlert("Error", data['statusMessage'], () => {
        });
      }
    });
  }
}
