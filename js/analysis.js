const getCoordinateTime = (data) => {
  if ("properties" in data && "coordTimes" in data.properties) {
    // "2023-06-03T22:29:16.000Z"
    return data.properties.coordTimes.map((x) => Date.parse(x));
  } else {
    return [];
  }
};

const analyze = (data) => {
  const times = getCoordinateTime(data);
  const msDur = times.length > 0 ? times[times.length - 1] - times[0] : 0;
  const centroid = turf.centroid(data);
  return {
    nPoints: data.geometry.coordinates.length,
    altitudes:
      data.geometry.coordinates[0].length > 2
        ? data.geometry.coordinates.map((x) => x[2])
        : [],
    times: times, // []timestamp
    msDur: msDur,
    distance: turf.lineDistance(data),
    bounds: turf.bbox(data),
    start: data.geometry.coordinates[0],
    centroid: centroid.geometry.coordinates, // to []float
  };
};

export { analyze };
