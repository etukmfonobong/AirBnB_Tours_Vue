//
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiZXR1a21mb25vYm9uZyIsImEiOiJja2JxbWMwMzEybmJzMnpxdmwwdDdpd3F2In0.nmG28sp34dZ_HJz2Q5e-hg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11'
})