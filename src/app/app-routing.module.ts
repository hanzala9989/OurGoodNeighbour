import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { SignUPComponent } from './Authentication/sign-up/sign-up.component';
import { HomeLayoutComponent } from './Dashboard/home-layout/home-layout.component';
import { SearchEventComponent } from './Dashboard/search-event/search-event.component';
import { UserComponent } from './Dashboard/user/user.component';
import { SearchUserComponent } from './Dashboard/search-user/search-user.component';
import { HelpDeskComponent } from './Dashboard/help-desk/help-desk.component';
import { SearchHelpDeskComponent } from './Dashboard/search-help-desk/search-help-desk.component';
import { RewardComponent } from './Dashboard/reward/reward.component';
import { SearchRewardComponent } from './Dashboard/search-reward/search-reward.component';
import { ProfileComponent } from './Authentication/profile/profile.component';
import { LeaderBoardComponent } from './Dashboard/leader-board/leader-board.component';
import { UserEventListComponent } from './Dashboard/user-event-list/user-event-list.component';
import { AuthGuard } from './Service/auth.guard';
import { RewardHistoryComponent } from './Dashboard/reward-history/reward-history.component';
import { EventComponent } from './Dashboard/event/event.component';
import { RewardLearderHistoryComponent } from './Dashboard/reward-learder-history/reward-learder-history.component';

const routes: Routes = [
  {
    path: "",
    component: HomeLayoutComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignUPComponent
  },
  {
    path: "upComingEvent",
    component: UserEventListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Volunteer'] }
  },
  {
    path: "createEvent",
    component: EventComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: "searchEvent",
    component: SearchEventComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: "createUser",
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: "searchUser",
    component: SearchUserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: "createHelp",
    component: HelpDeskComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Volunteer', 'Admin'] }
  },
  {
    path: "searchHelp",
    component: SearchHelpDeskComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Volunteer', 'Admin'] }
  },
  {
    path: "createReward",
    component: RewardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: "searchReward",
    component: SearchRewardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Volunteer', 'Admin'] }
  },
  {
    path: "leaderBoard",
    component: LeaderBoardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Volunteer', 'Admin'] }
  },
  {
    path: "rewardHistory",
    component: RewardHistoryComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Volunteer', 'Admin'] }
  },
  {
    path: "rewardLeaderBoardHistory",
    component: RewardLearderHistoryComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Volunteer', 'Admin'] }
  },
  {
    path: "event",
    component: UserEventListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
