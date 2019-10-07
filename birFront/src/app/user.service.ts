import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthData } from "./user-data.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>()

  moreInfoRest:any;
  constructor( private _http: HttpClient ) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  // register( body: any) {
  //   return this._http.post('http://127.0.0.1:5000/users/register', body, {
  //     observe: 'body',
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   });
  // }

  register(name: string, email: string, password: string) {
    const authData: AuthData = { name: name, email: email, password: password};
    this._http.post('http://127.0.0.1:5000/users/register', authData)
    .subscribe( response => {
      console.log(response);
     });
  }

  // login( body: any ) {
  //   console.log("service",body);
  //   return this._http.post('http://127.0.0.1:5000/users/login', body, {
  //     observe: 'body',
  //     withCredentials: true,
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   });
  // }

  login( email: string, password: string) {
    const authData: AuthData = { name: name, email: email, password: password };
    this._http.post<{token: string}>('http://127.0.0.1:5000/users/login', authData)
    .subscribe( response => {
      const token = response.token;
      this.token = token;
      if(token) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
      }
   });
  }

  dashboard() {
    return this._http.get('http://127.0.0.1:5000/users/dashboard',{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  logout() {
    return this._http.get('http://127.0.0.1:5000/users/logout',{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  welcome() {
    return this._http.get('http://127.0.0.1:5000/users/welcome',{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  inputForms( body: any ) {
    return this._http.post('http://127.0.0.1:5000/users/input-forms', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  moreInfo(id){
    return this._http.post('http://127.0.0.1:5000/users/moreInfo', id, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  addComments(data) {
    return this._http.post('http://127.0.0.1:5000/users/addComments', data, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  restaurantInfo() {
   return this._http.get('http://127.0.0.1:5000/users/restaurant-info',{
    observe: 'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-Type', 'application/json')
  });
 }

 setData(data) {
   this.moreInfoRest = data;
 }

 getData() {
   return this.moreInfoRest;
 }

}
