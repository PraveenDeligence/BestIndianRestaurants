import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-input-forms',
  templateUrl: './input-forms.component.html',
  styleUrls: ['./input-forms.component.css']
})
export class InputFormsComponent implements OnInit {

  inputForm: FormGroup = new FormGroup({
    name: new FormControl (null, Validators.required),
    image: new FormControl (null, Validators.required),
    description: new FormControl (null, Validators.required),
    openHours: new FormControl (null, Validators.required),
    closeHours: new FormControl (null, Validators.required),
    phoneNo: new FormControl (null, Validators.required),
    cuisine: new FormControl (null, Validators.required),
    goodFor: new FormControl (null, Validators.required)
  })

  constructor( private _router: Router, private _formService: UserService) { }

  ngOnInit() {
  }


  moveToWelcome() {
    console.log(this.inputForm.value);
    this._formService.inputForms(JSON.stringify(this.inputForm.value)).subscribe(
      data => {console.log(data); this._router.navigate(['/welcome']);
       },
      error => console.log(error)
    );
    this._router.navigate(['/welcome']);
  }

}
