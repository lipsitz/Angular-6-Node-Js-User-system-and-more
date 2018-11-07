import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userinfo = '';
  role = '';
  constructor(private router: Router) {
    if (localStorage.getItem('userinfo')) {

      this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.role = this.userinfo['role'];
      if (this.role === "member") {
        this.router.navigate(['layout'])
        console.log("unautorized");
        

      }
    } else {
      this.router.navigate(['login'])
    }


  }

  ngOnInit() {
  }

}
