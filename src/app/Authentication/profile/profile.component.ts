import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userObject: any;
  levels: string | undefined;
  constructor(public commonService: CommonService){}
  ngOnInit(): void {
    const data: any = sessionStorage.getItem('userObject');
    this.userObject = JSON.parse(data);
    console.log(this.userObject);
  }

  editUser(){
    this.levels = 'profile';
    this.userObject = this.userObject;
  }

}
