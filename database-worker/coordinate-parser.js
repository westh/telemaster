import proj4 from 'proj4'

// according to https://epsg.io/25832 the UTM zone is 32, adjust if in a new zone
const ETRS89_PROJECTION = '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
const WGS84_PROJECTION = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'

export default ({ firstCoordinate, secondCoordinate }) => {
  const [longitude, latitude] = proj4(
    ETRS89_PROJECTION,
    WGS84_PROJECTION,
    [firstCoordinate, secondCoordinate]
  )
  return { latitude, longitude }
}
