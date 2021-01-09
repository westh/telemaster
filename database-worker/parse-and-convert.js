import etrs89ToWgs84 from './coordinate-parser.js'

function parseTechnologyAndFrequency (technologyAndFrequencyString, operator) {
  // this is specific to mastedatabasen, not a general mapping of technologies
  // to network generations
  const technologyMapping = {
    'GSM': '2G',
    'UMTS': '3G',
    'LTE': '4G',
    '5G-NR': '5G'
  }

  // eslint-disable-next-line no-unused-vars
  let [_, technology, frequency] = technologyAndFrequencyString.match(/([A-Z]*)(\d*)/)
  technology = technology.trim()

  // 5G is a bit weird so special clause for that shit
  const is5g = technologyAndFrequencyString.includes('5G')
  if (is5g) technology = '5G-NR'

  // special knowledge from TDC themselves, google it if in doubt
  // this statement should eventually be unnecessary, but by the time of write
  // i.e. start 2021 then mastedatabasen does not contain this info
  const isTdcAnd5g = operator.includes('TDC') && technology === '5G-NR'
  if (isTdcAnd5g) frequency = '700'

  return { technology: technologyMapping[technology], frequency }
}

function parseAndConvertData (dataPoint) {
  const isCoordinateValid = dataPoint.coordinates !== 'Planlagt'
  if (!isCoordinateValid) return null

  const [firstCoordinate, secondCoordinate] = dataPoint.coordinates
    .split(', ')
    .map(coordinate => Number(coordinate))
  
  const { latitude, longitude } = etrs89ToWgs84({ firstCoordinate, secondCoordinate })
  const { frequency, technology} = parseTechnologyAndFrequency(
    dataPoint.technologyAndFrequency,
    dataPoint.operator
  )

  const {
    operator,
    street,
    postalCode,
    city
  } = dataPoint

  return {
    operator,
    street: street.trim(),
    postalCode,
    city,
    latitude,
    longitude,
    frequency,
    technology
  }
}

export default parseAndConvertData
