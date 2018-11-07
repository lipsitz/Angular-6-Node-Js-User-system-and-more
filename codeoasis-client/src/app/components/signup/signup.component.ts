import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { tap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupData = { firstName: '', lastName: '', email: '', password: '', role: '' };
  message = '';



  constructor(private route: Router, private _UserService: UserService) {
    if (localStorage.getItem('userinfo')) {
      this.route.navigate(['home'])
    }
  }

  ngOnInit() {
  }


  signup() {
    console.log(this.signupData); 
    this._UserService.register(this.signupData);
  }
}
