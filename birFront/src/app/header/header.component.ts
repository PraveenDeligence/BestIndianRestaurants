import { Component, OnInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';
import { UserService } from '../user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  @ViewChild('search', {static: true})
  public searchElementRef: ElementRef;

  public zoom: number;
  public latitude: number;
  public longitude: number;
  public latlongs: any = [];
  public latlong: any = {};
  public searchControl: FormControl

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private userService: UserService) { }

  ngOnInit() {
    this.zoom = 8;
    this.latitude = 39.8282;
    this.latitude = -98.5795;

    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated= isAuthenticated;
    });

    this.mapsAPILoader.load().then(() => {
       const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
         types: [],
         componentRestrictions: {'country': 'IN'}
       });
       autocomplete.addListener('place_changed', () =>{
         this,this.ngZone.run(() => {
           const place: google.maps.places.PlaceResult = autocomplete.getPlace();
           if (place.geometry === undefined || place.geometry === null) {
             return;
           }

           const latlong = {
             latitude : place.geometry.location.lat(),
             longitude: place.geometry.location.lng()
           };
           this.latlongs.push(latlong);
           this.searchControl.reset();
         });
       });
    });
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
  private setCurrentPosition() {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;

      });
    }
  }

}
