# GPX TRACK VISUALIZATION

For outdoor amateurs :P

## Intro

### Data

- GPX ([GPS Exchange Format](https://en.wikipedia.org/wiki/GPS_Exchange_Format)) - a XML schema supported by most activitie-recorders (e.g., Garmin watches)
- [GeoJSON](https://geojson.org/), a format for encoding a variety of geographic data structures
  - https://l7editor.antv.antgroup.com/ or https://geojson.io/ for online exploring data
  - [ToGeoJSON](https://mapbox.github.io/togeojson/) (./lib/togeojson.js)

A transformed gpx-geojson is like:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "happy ruuning",
        "type": "trail_running",
        "time": "2023-06-03T22:29:16.000Z",
        "coordTimes": ["2023-06-03T22:29:16.000Z"]
      }
    }
  ],
  "geometry": {
    "type": "LineString",
    "coordinates": [[114.19872326776385, 27.52464727498591, 1515.5999755859375]]
  }
}
```

### Map

This project uses [mapbox-gl](https://www.mapbox.com/mapbox-gljs) for map rendering ([doc](https://docs.mapbox.com/mapbox-gl-js/api/)). The [glossary](https://docs.mapbox.com/help/glossary/) is w.r.t. mapbox as well.

- Source & Data:
  - tiled sources (tilesets): vector & raster(-dem)
    - digital elevation model ([DEM](https://en.wikipedia.org/wiki/Digital_elevation_model)): e.g., [mapbox-terrain-dem-v1](https://docs.mapbox.com/data/tilesets/reference/mapbox-terrain-dem-v1/)
  - geojson
  - image/video
- Styles: source + style -> rendering
  - `mapbox://styles/mapbox/outdoors-v12` https://www.mapbox.com/maps/outdoors
- Camera: a map's field of view

![](https://assets-global.website-files.com/5f2a93fe880654a977c51043/62df774eaf9582b5789d123d_FreeCamera_Position_Calculation_-_GeoGebra.png) (from [1])


## Refs

- [1] https://www.mapbox.com/blog/building-cinematic-route-animations-with-mapboxgl
