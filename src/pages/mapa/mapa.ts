import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';
import { LugaresProvider } from '../../providers/lugares/lugares';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  markers: any[] = [];
  places: any[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private place: LugaresProvider,
    private geolocation: Geolocation) {
    this.place.getLugares().valueChanges()
    .subscribe((locations) => {
      this.places = locations;
    }, (error) => console.log(error));
  }

  ionViewDidEnter(){
this.loadmap();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();

    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      // minZoom: 12,
      maxZoom: 18
    }).addTo(this.map);
    this.geolocation.getCurrentPosition().then((resp) => {
      let latitud = resp.coords.latitude
      let longitud = resp.coords.longitude
      this.map.setView([latitud, longitud], true);
    }).catch((error) => {
      console.log('error getting location', error);
    });
    this.places.forEach(Lugar => {
      leaflet.marker([Lugar.lat, Lugar.lng]).addTo(this.map)
    });
  //   
  }
}
