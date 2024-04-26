import { GPX_DATA, ACCESS_TOKEN } from "./profile.js";
import { fetchGPX } from "./util.js";
import { options } from "./options.js";
import { analyze } from "./analysis.js";

mapboxgl.accessToken = ACCESS_TOKEN;

const map = new mapboxgl.Map({
  container: "map",
  style: options.style,
  center: [0, 90], // fixed start point
  zoom: 2, // fixed start zoom, global view
  pitch: 0,
  bearing: 0,
});

const [rawData] = await Promise.all([
  fetchGPX(GPX_DATA),
  map.once("style.load"),
]);

console.log("gpx & style loaded");

map.addSource("mapbox-dem", {
  type: "raster-dem",
  url: options.dem,
  tileSize: 512,
  maxzoom: 14,
});
map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

const routeData = rawData.features[0];
const analysis = analyze(routeData);
// console.log(analysis);

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

map.once("idle", () => {
  map.flyTo({
    center: analysis.centroid,
    zoom: 10,
  });

  // add marker
  const marker = new mapboxgl.Marker({
    color: "red",
    scale: 0.8,
    draggable: false,
    pitchAlignment: "auto",
    rotationAlignment: "auto",
  })
    .setLngLat(analysis.start)
    .addTo(map);
});
