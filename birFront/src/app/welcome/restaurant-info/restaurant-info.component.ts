import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})
export class RestaurantInfoComponent implements OnInit {
  bookTableForm: FormGroup = new FormGroup({
    name: new FormControl (null, Validators.required),
    image: new FormControl (null, Validators.required),
    description: new FormControl (null, Validators.required),
  })
  restaurant: any;
  user: any;

  constructor( private _restaurantInfo: UserService ) { }

  ngOnInit() {
    this.restaurant = this._restaurantInfo.getData();
    console.log(this.restaurant);
    }

    addComments(id, comment){
      console.log(id, comment);
       this.user = localStorage.getItem("user")
       this.user = JSON.parse(this.user)
       this._restaurantInfo.addComments({id:id,comment:comment, name: this.user.name}).subscribe(
        (response)=>{
          this.ngOnInit();
        },
        error=> console.log(error)
      )
    }
}
