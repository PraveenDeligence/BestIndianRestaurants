// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   isLoading = false;
//   loginForm: FormGroup = new FormGroup({
//     email: new FormControl(null, [Validators.email, Validators.required]),
//     password: new FormControl(null, Validators.required)
//   });

//   constructor(private _router: Router, private _user: UserService ) { }

//   ngOnInit() {
//   }

//   moveToRegister() {
//     this._router.navigate(['/register']);
//   }

//   login() {
//     if (!this.loginForm.valid) {
//       console.log('Invalid'); return;
//     }
// this._user.login(JSON.stringify(this.loginForm.value))
// .subscribe(
//    ( response: any ) => {
//     console.log(response);
//      var user = response.user
//     localStorage.setItem("user",JSON.stringify(user))
//     this._router.navigate(['/dashboard']);
//   } ,
//   error=> console.error(error)

//  )}

// }

import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  constructor(private _router: Router, public _user: UserService ) { }

  ngOnInit() {
  }

  onLogin(form: NgForm){
    if(form.invalid) {
      return;
    }
    this._user.login(form.value.email, form.value.password);
  }

  moveToRegister() {
    this._router.navigate(['/register']);
  }
}
