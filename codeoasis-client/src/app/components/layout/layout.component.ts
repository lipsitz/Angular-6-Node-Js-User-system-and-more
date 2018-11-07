import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { OmdbService } from '../../services/omdb/omdb.service'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  time: string;
  yearTime: string;
  yearTimeNumber: Number;
  yearsArray: Array<number>;
  userinfo = JSON.parse(localStorage.getItem('userinfo'));
  maindata: any;
  status: any;
  searchData = { s: '', y: '' };

  constructor(private router: Router, private OmbdService: OmdbService, private datePipe: DatePipe) {
    this.yearsArray = [];
    if (!localStorage.getItem('userinfo')) {
      this.router.navigate(['login'])
    }
  }

  ngOnInit() {
    this.time = this.datePipe.transform(new Date());
    this.yearTime = new DatePipe('en-US').transform(this.time, 'y');
    this.yearTimeNumber = Number(this.yearTime);
    for (let i = 1940; i <= this.yearTimeNumber; i++) {
      this.yearsArray.push(i);
    }

  }

  searchdata() {
    this.OmbdService.getData(this.searchData).subscribe((maindata) => {
      this.maindata = maindata;
      if (this.maindata.Response === "False") {
        this.status = "0 Results Try Again"
      } else {
        this.status = "Results " + this.maindata.totalResults;
      }
    })
  };


}

