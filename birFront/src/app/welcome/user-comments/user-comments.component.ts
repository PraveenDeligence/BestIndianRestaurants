import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';


@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit {
  @ViewChild('search', {static: true})
  public searchElementRef: ElementRef;

  public zoom: number;
  public latitude: number;
  public longitude: number;
  public latlongs: any = [];
  public latlong: any = {};
  public searchControl: FormControl



  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    this.zoom = 8;
    this.latitude = 39.8282;
    this.latitude = -98.5795;

    this.searchControl = new FormControl();
    this.setCurrentPosition();

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
