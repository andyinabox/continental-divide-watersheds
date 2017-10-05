import styles from './styles.scss';
import * as Leaflet from 'leaflet';
import * as topojson from 'topojson';
import 'whatwg-fetch';

const tilesUrl = 'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png';
const s3Url = '//s3.us-east-2.amazonaws.com/continental-divide/';
const dataUrl = s3Url + 'data/watersheds.topo.json';

const featureStyles = {
  fill: false,
  weight: 2
}

// create map container element
let mapContainer = document.createElement('div');
mapContainer.id = 'map-container';
document.body.appendChild(mapContainer);

// create loading indicator
let loadingContainer = document.createElement('div');
loadingContainer.id = 'loading';
loadingContainer.innerHTML = 'Loading watershed boundaries...';
document.body.appendChild(loadingContainer); 

// set up map and map tile layer
const map = Leaflet.map('map-container')
  .setView([47.47184, -92.96549], 12);
const tiles = new Leaflet.TileLayer(tilesUrl, { attribution: 'Tiles via Stamen, watershed boundaries via USGS'});

// add map tile layer
map.addLayer(tiles);	

// load topojson and add tp map
fetch(dataUrl)
  .then((res) => res.json())
  .then((json) => {
  
    // convert topojson to geojson
    let geojson = topojson.feature(json, json.objects.watersheds);

    Leaflet.geoJSON(geojson, {
      style: (feature) => featureStyles
    }).addTo(map)

    loadingContainer.className = 'done';
  });