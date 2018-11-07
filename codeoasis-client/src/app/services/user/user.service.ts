import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  message = '';
  data: any;
  userinfo: any;

  constructor(private http: HttpClient, private router: Router) { }

  register(signupData) {

    return this.http.post('http://localhost:3000/api/users/signup', signupData).subscribe(resp => {
      console.log(resp);
      console.log(signupData);
      this.router.navigate(['login']);
    }, err => {
      console.log(err.error.msg);
    });
  }


  login(loginData) {
    return this.http.post('http://localhost:3000/api/users/signin', loginData).subscribe(resp => {
      this.data = resp['user'];

      this.userinfo = {
        firstName: this.data['firstName'],
        lastName: this.data['lastName'],
        email: this.data['email'],
        role: this.data['role'],
        token: resp['token']
      }
      localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
      this.userinfo = JSON.parse(localStorage.getItem('userinfo'));
      console.log(this.userinfo);

      this.router.navigate(['layout']);
    }, err => {
      console.log(err.error.msg);
    });
  }
}
