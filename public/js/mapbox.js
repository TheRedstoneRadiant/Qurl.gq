let map;
const mapToken = process.env.MAPBOX_API_TOKEN;
const mapboxgl = require('mapbox-gl');
const dataTheme = document.querySelector('body').getAttribute('data-theme');
const visitors = document.querySelector('#visitors');

if (visitors.length !== 0) {
  mapboxgl.accessToken = mapToken;

  map = new mapboxgl.Map({
    container: 'map',
    style: `mapbox://styles/mapbox/${dataTheme}-v10`,
  });

  const bounds = new mapboxgl.LngLatBounds(); // create map bounds

  for (const visitor of JSON.parse(visitors)) {
    // create an empty marker element
    const element = document.createElement('div');
    element.className = 'marker';

    // create and apply marker object
    new mapboxgl.Marker({
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
