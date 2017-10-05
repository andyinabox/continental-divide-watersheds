import styles from './styles.scss';
import * as Leaflet from 'leaflet';
import 'whatwg-fetch';

const osmUrl = 'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png';

const featureStyles = {
  fill: false,
  weight: 2
}

let mapContainer = document.createElement('div');
mapContainer.id = 'map-container';
document.body.appendChild(mapContainer);

const map = Leaflet.map('map-container').setView([47.47184, -92.96549], 10);
let osm = new Leaflet.TileLayer(osmUrl);

map.addLayer(osm);	

fetch('data/watersheds.geojson')
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    Leaflet.geoJSON(json, {
      style: (feature) => featureStyles
    }).addTo(map)
  });