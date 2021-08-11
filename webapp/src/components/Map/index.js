import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl, { FullscreenControl, NavigationControl, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import './mapbox-override.css';

const StyledMap = styled.div`
  height: 100vh;
`

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const Map = ({ data, onPopUp, popUpRef }) => {
  const mapContainerRef = useRef(null)
  const map = useRef()

  const initalLongitude = 10.36
  const intialLatitude = 56.21
  const initialZoom = 6.35
  const [doesMapExist, setDoesMapExist] = useState(false)

  function createSourceIfNotAlreadyExists (sourceName, data) {
    const source = map.current.getSource(sourceName)
    const doesSourceExist = !!source
    if (!doesSourceExist) {
      map.current.addSource(sourceName, {
        type: 'geojson',
        data,
      })
    }
    return !doesSourceExist
  }

  useEffect(() => {
    if (!doesMapExist) return

    const wasSourceCreated = createSourceIfNotAlreadyExists('all', data)
    if (wasSourceCreated) return

    const source = map.current.getSource('all')
    source.setData(data)
  }, [data, doesMapExist])

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      // This should improve mapbox performance according to
      // this: https://docs.mapbox.com/help/troubleshooting/mapbox-gl-js-performance/#remove-unused-features
      style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
      center: [initalLongitude, intialLatitude],
      zoom: initialZoom,
      maxBounds: [
        [2.5, 53],
        [18.5, 59]
      ],
    })

    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl
      })
    )

    map.current.addControl(new NavigationControl())
    map.current.addControl(new FullscreenControl())

    // map.current.on('move', () => {
      // console.log(map.current.getBounds())
      // setLng(map.current.getCenter().lng.toFixed(4))
      // setLat(map.current.getCenter().lat.toFixed(4))
      // setZoom(map.current.getZoom().toFixed(2))

    // })

    map.current.on('load', () => {
      setDoesMapExist(true)
      createSourceIfNotAlreadyExists('all', {
        type: 'FeatureCollection',
        features: []
      })

      map.current.addLayer({
        id: 'mast-circle',
        type: 'circle',
        source: 'all',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, ['interpolate', ['linear'], ['get', 'accuract'], 1, 1, 6, 4],
            16, ['interpolate', ['linear'], ['get', 'accuract'], 1, 5, 6, 50]
          ],
          'circle-color': [
            'match',
            ['get', 'operator'],
            'TDC Mobil A/S',
            '#106eb4',
            'Hi3G Denmark ApS',
            '#f37423',
            'Telia - Telenor (TT Netværket)',
            '#996EE3',
            /* other */ '#ccc'
          ],
          'circle-stroke-color': [
            'match',
            ['get', 'operator'],
            'TDC Mobil A/S',
            'rgba(16, 110, 180, 0.2)',
            'Hi3G Denmark ApS',
            'rgba(243, 116, 35, 0.2)',
            'Telia - Telenor (TT Netværket)',
            'rgba(153, 110, 227, 0.2)',
            /* other */ '#ccc'
          ],
          'circle-stroke-width': 4,
          'circle-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 0.5, 8, 1
          ],
          'circle-stroke-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 0.5, 8, 1
          ]
        }
      })

      map.current.on('mousemove', 'mast-circle', () => {
        map.current.getCanvas().style.cursor = 'pointer'
      })

      map.current.on('mouseleave', 'mast-circle', () => {
        map.current.getCanvas().style.cursor = ''
      })

      map.current.on('click', 'mast-circle', circles => {
        if (circles.features.length) {
          const coordinates = circles.features[0].geometry.coordinates.slice()

          onPopUp(circles.features.map(features => features.properties))

          new Popup()
            .setLngLat(coordinates)
            .setDOMContent(popUpRef.current)
            .addTo(map.current)
        }
      })
    })

    // clean up on unmount
    return () => map.current.remove()
    // eslint-disable-next-line
  }, [])

  return (
    <StyledMap ref={mapContainerRef} />
  )
}

export default Map
