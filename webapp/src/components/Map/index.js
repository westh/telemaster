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

  const [lng, setLng] = useState(10.7600)
  const [lat, setLat] = useState(56.3160)
  const [zoom, setZoom] = useState(6.35)

  function createSourceIfNotAlreadyExists (sourceName, data) {
    const source = map.current.getSource(sourceName)
    const doesSourceExist = !!source
    if (!doesSourceExist) {
      map.current.addSource(sourceName, {
        type: 'geojson',
        data
      })
    }
    return !doesSourceExist
  }

  useEffect(() => {
    const doesMapExist = !!map.current
    if (!doesMapExist) return

    const wasSourceCreated = createSourceIfNotAlreadyExists('all', data)
    if (wasSourceCreated) return
    
    const source = map.current.getSource('all')
    source.setData(data)
  }, [data])

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom
    })

    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl
      })
    )

    map.current.addControl(new NavigationControl())
    map.current.addControl(new FullscreenControl())

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })

    map.current.on('load', () => {
      createSourceIfNotAlreadyExists('all', {
        type: 'FeatureCollection',
        features: []
      })

      map.current.addLayer({
        id: 'masts-heat',
        type: 'heatmap',
        source: 'all',
        maxzoom: 9,
        paint: {
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1, 9, 3
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(0, 0, 0, 0)',
            0.2, 'rgba(192, 253, 255, 0.3)',
            0.5, 'rgba(192, 253, 255, 0.6)',
            1, 'rgba(200, 231, 255, 0.7)'
          ],
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2, 9, 20
          ],
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 1, 9, 0
          ]
        }
      }, 'waterway-label')

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
            ' #996EE3',
            /* other */ '#ccc'
          ],
          'circle-stroke-color': 'white',
          'circle-stroke-width': 0.8,
          'circle-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 0, 8, 1
          ],
          'circle-stroke-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 0, 8, 1
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

    // map.current.zoomToFitAllPoints = ({ points, padding }) => {
    //   const boundingBox = new LngLatBounds()
    //   points.forEach(coordinates => boundingBox.extend(coordinates))
    //   map.current.fitBounds(boundingBox, { padding, maxZoom: 10 })
    // }

    // clean up on unmount
    return () => map.current.remove()
    // eslint-disable-next-line
  }, [])

  return (
    <StyledMap ref={mapContainerRef} />
  )
}

export default Map
