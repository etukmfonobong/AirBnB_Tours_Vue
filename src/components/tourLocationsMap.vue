<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  name: "tourLocationsMap",
  props: ['locations'],
  data() {
    return {
      accesstoken: 'pk.eyJ1IjoiZXR1a21mb25vYm9uZyIsImEiOiJja2JxbWMwMzEybmJzMnpxdmwwdDdpd3F2In0.nmG28sp34dZ_HJz2Q5e-hg'
    }
  },
  mounted() {
    mapboxgl.accessToken = this.accesstoken

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/etukmfonobong/ckggnmdbz4t9l19pe0qb1kohs',
      scrollZoom: false
      // center: [-118.140397, 34.142925],
      // zoom: 6,
      // interactive: false
    })

    const bounds = new mapboxgl.LngLatBounds()

    this.locations.forEach(location => {
      let x = 0
      x += 1
      //create marker
      const el = document.createElement('div')
      el.className = 'marker'

      //add marker
      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
      }).setLngLat(location.coordinates)
          .addTo(map)

      //add popup
      new mapboxgl.Popup({
        offset: 35
      })
          .setLngLat(location.coordinates)
          .setHTML(`<p>${location.description}</p>`)
          .addTo(map)

      //extend map bounds to include location
      bounds.extend(location.coordinates)
    })

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 100,
        left: 100,
        right: 100
      }
    })

  }
}
</script>

<style scoped>

</style>