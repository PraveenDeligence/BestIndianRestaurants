import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: string= '';

  constructor( private _user: UserService, private _router: Router) {
    this._user.dashboard()
    .subscribe(
      data=> this.addName(data),
      error=> this._router.navigate(['/login'])
    )
  }

  addName(data) {
   this.name = data.name;
  }

  ngOnInit() {
  }

  logout() {
    this._user.logout()
    .subscribe(
      data=> {console.log(data); this._router.navigate(['/login'])},
      error=> this._router.navigate(['/login'])

    )
  }
}
