import { GPX_DATA, ACCESS_TOKEN } from "./profile.js";
import { fetchGPX } from "./util.js";

const rawData = await fetchGPX(GPX_DATA);
console.log("gpx loaded");
console.log(rawData);

const routeData = rawData.features[0];
const start = routeData.geometry.coordinates[0];

mapboxgl.accessToken = ACCESS_TOKEN;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/outdoors-v12",
  center: start,
  zoom: 10,
  pitch: 0,
  bearing: 0,
});

await map.once("style.load");

map.addSource("mapbox-dem", {
  type: "raster-dem",
  url: "mapbox://mapbox.terrain-rgb",
  tileSize: 512,
  maxzoom: 14,
});
map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

// add track route line
map.addSource("line", {
  type: "geojson",
  data: routeData,
});
map.addLayer({
  type: "line",
  source: "line",
  id: "line",
  paint: {
    "line-color": "rgba(255,0,0,1)", // red
    "line-width": 3,
  },
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
});

await map.once("load");
console.log("map loaded");
