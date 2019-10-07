import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',


  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  restaurants: any;
  constructor( private restaurantAdd: UserService, private _router: Router) { }

  ngOnInit() {

    this.restaurantAdd.welcome()
  .subscribe(
  (data:any)=> {
    console.log(data);
    this.restaurants = data.views},
  error=> console.error(error)
   )
  }

  moreInfo(id){
    this.restaurantAdd.moreInfo({id:id}).subscribe(
      (response)=>{
        console.log("response",response);
        this.restaurantAdd.setData(response);
        this._router.navigate(['/restaurant-info']);

      },
      (error)=>{
        console.log(error)
      }
    )
  }
}
