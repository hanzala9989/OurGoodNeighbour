import { Component, OnInit } from '@angular/core'
import { catchError, elementAt, of } from 'rxjs'
import { AlertService } from 'src/app/Service/alert.service'
import { DeleteServiceService } from 'src/app/Service/delete-service.service'
import { GetServiceService } from 'src/app/Service/get-service.service'
import { UserDefinedLabels } from 'src/assets/labelsConstant'
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar'
import { CommonService } from 'src/app/Service/common.service'

@Component({
  selector: 'app-user-event-list',
  templateUrl: 'user-event-list.component.html',
  styleUrls: ['user-event-list.component.scss'],
  animations: [
    trigger('zoomIn', [
      state('void', style({ transform: 'scale(0)' })),
      transition(':enter', [
        animate('0.3s ease-out', style({ transform: 'scale(1)' })),
      ]),
    ]),
    trigger('zoomOut', [
      state('in', style({ transform: 'scale(1)' })),
      transition('void => *', [
        style({ transform: 'scale(1)' }),
        animate('300ms ease-out', style({ transform: 'scale(0)' })),
      ]),
      transition('* => void', [
        animate('300ms ease-in', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class UserEventListComponent implements OnInit {
  MainResponseData: any[] = []
  responseData: any[] = []
  userObjectList: any[] = []
  responseDataUserEvent: any[] = []
  userObjectEvent: any[] = []
  noDataFoundFlag: boolean = false
  searchQuery: string = ''
  leavingAnimation = false;
  labels = UserDefinedLabels
  constructor(
    private service$: GetServiceService,
    public commonService:CommonService,
    private deleteService$: DeleteServiceService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getUserByID();
  }


  getAllEvent() {
    this.service$
      .searchEvent(10, 1)
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error)
          return of([]) // Return an empty array in case of an error
        })
      )
      .subscribe((data) => {
        if (data[UserDefinedLabels.result][0].length === 0) {
          this.noDataFoundFlag = true
        } else {
          this.noDataFoundFlag = false
        }

        if (
          data['statusCode'] === UserDefinedLabels.StatusCode_200 &&
          data['result'] &&
          data['result'].length > 0
        ) {
          this.responseData = data['result'][0];
          this.MainResponseData = data['result'][0];

          if (this.userObjectEvent && this.userObjectEvent.length > 0) {
            const eventIDSet = new Set(
              this.userObjectEvent.map((item) => item.eventID)
            )
            this.responseData.forEach((ele) => {
              ele.status = eventIDSet.has(ele.eventID) ? 11 : 13
            })
          }
        } else {
          this.responseData = []
        }
      })
  }

  getUserByID() {
    let userID: number = Number(sessionStorage.getItem('userID'))
    this.service$.getUserByID(userID).subscribe((data) => {
      if (
        data['statusCode'] == UserDefinedLabels.StatusCode_200 &&
        data['result'] &&
        data['result'].length > 0
      ) {
        this.userObjectEvent = data['result'][0].joiningEventUser
        console.log('this.userObjectEvent :: ', this.userObjectEvent)
        this.getAllEvent()
      }
    })
  }

  assign(item: any) {
    item.attented = true;
    let userID: number = Number(sessionStorage.getItem('userID'));
    console.log('hanzala is testing');

    this.service$
      .assignUserEvent(userID, Number(item.eventID))
      .subscribe((data) => {
        if (data['statusCode'] === UserDefinedLabels.StatusCode_500) {
          this.alertService.showAlert('Error', data['statusMessage'], () => { })
        }
        if (data['statusCode'] === UserDefinedLabels.StatusCode_200) {
          this.alertService.showAlert('Success', data['statusMessage'], () => {
            this.getUserByID();
          });
        }
      })
  }

  getAllUserFromEvent(eventID: any) {
    console.log('eventID ::', eventID)
    this.service$.getAllUserFromEvent(eventID).subscribe(
      (data) => {
        this.userObjectList = []
        if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
          this.userObjectList = data['result'][0]
          console.log('this.userObjectList', data['result'][0])
        }
      },
      (error) => {
        this.alertService.showAlert(
          'Error',
          'Error Adding Event :: ' + error,
          () => { }
        )
      }
    )
  }

  leave(item: any) {
    const userID = sessionStorage.getItem('userID')
    this.deleteService$
      .deleteUserFromEvent(Number(userID), item.eventID)
      .subscribe(
        (data) => {
          if (data['statusCode'] == UserDefinedLabels.StatusCode_200) {
            let that = this
            this.alertService.showAlert(
              'Success',
              data['statusMessage'],
              () => {
                that.leavingAnimation = true;
                this.getUserByID();
              }
            )
          } else {
            this.alertService.showAlert(
              'Error',
              data['statusMessage'],
              () => { }
            )
          }
        },
        (error) => {
          this.alertService.showAlert(
            'Error',
            'Error leaving Event :: ' + error,
            () => { }
          )
        }
      )
  }

  searchEvents() {
    if (this.searchQuery) {
      this.responseData = this.responseData.filter((event) => {
        const query = this.searchQuery.toLowerCase()
        console.log(query)

        // Check if the search query is empty, and if it is, return true for all events
        if (query === '') {
          return true
        }

        return (
          event?.eventName?.toLowerCase().includes(query) ||
          event?.eventDate?.toLowerCase().includes(query) ||
          event?.eventVenue?.toLowerCase().includes(query) ||
          event?.eventID?.toString().includes(query)
        )
      })
    } else {
      this.responseData = this.MainResponseData // Clear search results when search query is empty
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.searchQuery === '') {
      this.searchEvents()
    }
  }
}
