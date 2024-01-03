import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUPComponent } from './Authentication/sign-up/sign-up.component';
import { HomeLayoutComponent } from './Dashboard/home-layout/home-layout.component';
import { SearchEventComponent } from './Dashboard/search-event/search-event.component';
import { UserComponent } from './Dashboard/user/user.component';
import { SearchUserComponent } from './Dashboard/search-user/search-user.component';
import { HelpDeskComponent } from './Dashboard/help-desk/help-desk.component';
import { SearchHelpDeskComponent } from './Dashboard/search-help-desk/search-help-desk.component';
import { HeaderComponent } from './Common/header/header.component';
import { FooterComponent } from './Common/footer/footer.component';
import { UpdatePasswordComponent } from './Common/update-password/update-password.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './Service/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingIndicatorComponent } from './Common/loading-indicator/loading-indicator.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertComponent } from './Common/alert/alert.component';
import { RewardComponent } from './Dashboard/reward/reward.component';
import { SearchRewardComponent } from './Dashboard/search-reward/search-reward.component';
import { LoginComponent } from './Authentication/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import { ProfileComponent } from './Authentication/profile/profile.component';
import { LeaderBoardComponent } from './Dashboard/leader-board/leader-board.component';
import { MatSortModule } from '@angular/material/sort';
import { UserEventListComponent } from './Dashboard/user-event-list/user-event-list.component';
import { MatListModule } from '@angular/material/list';
import { UmbcEmailDirective } from './Directive/umbc-email.directive';
import { RewardHistoryComponent } from './Dashboard/reward-history/reward-history.component';
import { EventComponent } from './Dashboard/event/event.component';
import { AppPasswordMatchValidatorDirective } from './Service/app-password-match-validator.directive';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { RewardLearderHistoryComponent } from './Dashboard/reward-learder-history/reward-learder-history.component';
import {MatRippleModule} from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUPComponent,
    HomeLayoutComponent,
    EventComponent,
    SearchEventComponent,
    UserComponent,
    SearchUserComponent,
    HelpDeskComponent,
    SearchHelpDeskComponent,
    HeaderComponent,
    FooterComponent,
    UpdatePasswordComponent,
    LoadingIndicatorComponent,
    AlertComponent,
    RewardComponent,
    SearchRewardComponent,
    ProfileComponent,
    LeaderBoardComponent,
    UserEventListComponent,
    UmbcEmailDirective,
    RewardHistoryComponent,
    AppPasswordMatchValidatorDirective,
    RewardLearderHistoryComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatRippleModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    })
  ],
  providers: [
    // Other providers
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
