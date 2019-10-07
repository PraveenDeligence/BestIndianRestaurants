// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {

//   registerForm: FormGroup = new FormGroup({
//     name: new FormControl (null, Validators.required),
//     email: new FormControl (null, [Validators.email, Validators.required]),
//     password: new FormControl (null, Validators.required),
//     password2: new FormControl (null, Validators.required)

//   });

//   constructor( private _router: Router, private _userService: UserService ) { }

//   ngOnInit() {
//   }
//   moveToLogin() {
//     this._router.navigate(['/login']);
//   }

//   register() {
//     if (!this.registerForm.valid || (this.registerForm.controls.password.value !== this.registerForm.controls.password2.value)) {
//       console.log('Invalid Form'); return;
//     }
//     this._userService.register(JSON.stringify(this.registerForm.value)).subscribe(
//       data => {console.log(data); this._router.navigate(['/login']);
//        },
//       error => console.log(error)
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  constructor( private _router: Router, public _userService: UserService) { }

  ngOnInit() {
  }
  moveToLogin() {
    this._router.navigate(['/login']);
  }

  onSignup(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this._userService.register(form.value.name, form.value.email, form.value.password);
  }
}
