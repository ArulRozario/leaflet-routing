import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
declare let L;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map:any;
  routingControl:any;
  constructor(private http:HttpClient) { 
  }

  ngOnInit() {
    this.renderMap();
  }

  private renderMap() {
    if(this.map) this.map.remove();
    this.map = L.map('map').setView([35.989, 	-80.22],4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom:3,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }
  private drawRoute(routes){
    // flip lat lng positions in the array for leaflet.
    const routePoints = routes.waypoints.map(point=> [point.location[1],point.location[0]]);
    this.routingControl && this.map.removeControl(this.routingControl);
    this.routingControl = L.Routing.control({
      waypoints: routePoints,
      showAlternatives: true,
      lineOptions: { styles: [{ color: 'green', weight: 7 }], extendToWaypoints: false, missingRouteTolerance: 1 },
      fitSelectedRoutes: false,
      altLineOptions: { styles: [{ color: 'green', weight: 7 }], extendToWaypoints: false, missingRouteTolerance: 1 },
      show: false,
      routeWhileDragging: false,
    })
    this.routingControl.addTo(this.map);
  }
  getRoutes(coordinates?:any[]){
    if(!coordinates?.length) return;
    const barUrl = `https://router.project-osrm.org/route/v1/driving`;
    const params = `overview=false&alternatives=false&steps=false`;
    // convert the API call to promise to close the stream immediately.
    this.http.get(`${barUrl}/${coordinates?.join(';')}?${params}`).toPromise().then(res=> this.drawRoute(res));
  }

}
