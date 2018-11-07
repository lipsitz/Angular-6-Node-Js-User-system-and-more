
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = { email: '', password: '' };
  data: any;

  constructor(private _UserService: UserService, private router: Router) {
    if (localStorage.getItem('userinfo')) {
      this.router.navigate(['home'])
    }
  }

  ngOnInit() { }

  signin() {
    this._UserService.login(this.loginData);
  }
}
