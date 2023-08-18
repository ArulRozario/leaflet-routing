import { Component, OnInit, ViewChild } from '@angular/core';
import { routesData } from '../data';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  data = routesData;
  routeVisible = false;
  mapVisible = false;
  routeCoordinates = [];
  @ViewChild(MapComponent) map: MapComponent;

  ngOnInit(): void {}
  // select all is buggy. Manually checked and unchecked checkboxes don't get affected by selectAll. It's a very primitive solution for demo only. Focus is on map
  selectAll(event) {
    const status = event.target.checked;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => checkbox.removeAttribute('checked'));
    if (status) {
      checkboxes.forEach((checkbox) =>
        checkbox.setAttribute('checked', 'true')
      );
    }
  }
  route() {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const coordinates = [];
    checkboxes.forEach((checkbox) => {
      if ((checkbox as any).value === 'on') return; // for the selectAll checkbox.
      coordinates.push((checkbox as any).value);
    });
    this.routeCoordinates = coordinates;
    this.mapVisible = true;
  }
}
