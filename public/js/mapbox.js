let map;

if (visitors.length !== 0) { // eslint-disable-line
  mapboxgl.accessToken = mapToken; // eslint-disable-line

  map = new mapboxgl.Map({// eslint-disable-line
    container: 'map',
    style: `mapbox://styles/mapbox/${dataTheme}-v10`, // eslint-disable-line
  });

  const bounds = new mapboxgl.LngLatBounds(); // eslint-disable-line

  for (const visitor of JSON.parse(visitors)) {// eslint-disable-line
    // create an empty marker element
    const element = document.createElement('div');
    element.className = 'marker';

    // create and apply marker object
    new mapboxgl.Marker({// eslint-disable-line
      element,
    })
      .setLngLat(visitor.coordinates)
      .addTo(map);

    // extends the map bounds to include coordinates
    bounds.extend(visitor.coordinates);
  }

  /// zoom out /in feature editing and actaully exexute the options made
  // above
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
}
