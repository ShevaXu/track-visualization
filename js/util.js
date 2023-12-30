const fetchGPX = async (name) => {
  return fetch(name)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((xml) => toGeoJSON.gpx(xml));
};

export { fetchGPX };
