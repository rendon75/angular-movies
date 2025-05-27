import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Icon, icon, latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet'
import { Coordinate } from './coordinate.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  @Input()
  initialCoordinate: Coordinate[] = [];

  @Output()
  coordinateSelected = new EventEmitter<Coordinate>();

  ngOnInit(): void {
    this.layers = this.initialCoordinate.map(value => {
      return marker([value.latitude, value.longitude], this.markerOptions);
    })
  }

  markerOptions = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 14,
    center: latLng(33.019365, -96.694920)
  }
  layers: Marker<any>[] = [];

  handleClick(event: LeafletMouseEvent) {
    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;
    console.log({lat: latitude, lng: longitude});

    this.layers = [];
    this.layers.push(marker([latitude, longitude], this.markerOptions));
    this.coordinateSelected.emit({ latitude, longitude });
  }
}
