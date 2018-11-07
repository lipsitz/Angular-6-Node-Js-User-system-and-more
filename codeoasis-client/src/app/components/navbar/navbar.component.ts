import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as $ from 'jquery';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userinfo = '';
  role = '';
  constructor(private router: Router, private _UserService: UserService) {
    if (localStorage.getItem('userinfo')) {

      this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.role = this.userinfo['role'];
      if (this.role == "member") {
        console.log("member");
      }
    } else {
      this.router.navigate(['login'])
    }
  }


  ngOnInit() { }

  logout() {
    localStorage.removeItem('userinfo');
    console.log("token destroy , return to login");

  }


}

