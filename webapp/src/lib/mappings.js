const networkGenerations = [
  '2G',
  '3G',
  '4G',
  '5G'
]

const operatorsMapping = {
  'TDC': 'TDC Mobil A/S',
  'Telia/Telenor': 'Telia - Telenor (TT Netværket)',
  '3 DK': 'Hi3G Denmark ApS',
}

const operatorsColorMapping = {
  'TDC': {
    main: 'rgb(16, 110, 180)',
    border: 'rgba(16, 110, 180, 0.2)'
  },
  'Telia/Telenor': {
    main: 'rgb(153, 110, 227)',
    border: 'rgba(153, 110, 227, 0.2)'
  },
  '3 DK': {
    main: 'rgb(243, 116, 35)',
    border: 'rgba(243, 116, 35, 0.2)'
  }
}

const operatorsShortNameMapping = {
  'tdc': 'TDC',
  'three': '3 DK',
  'teliaTelenor': 'Telia/Telenor',
}

const frequenciesMapping = {
 '700MHz': 700,
 '800MHz': 800,
 '900MHz': 900,
 '1800MHz': 1800,
 '2100MHz': 2100,
 '2300MHz': 2300,
 '2600MHz': 2600
}

export {
  networkGenerations,
  operatorsMapping,
  operatorsColorMapping,
  operatorsShortNameMapping,
  frequenciesMapping
}
