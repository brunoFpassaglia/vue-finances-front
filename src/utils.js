import colors from 'vuetify/lib/util/colors'

const formatError = message => {
  const messageSplit = message.split(':')
  return messageSplit[messageSplit.length - 1].trim()
}

const currencyFormatter = ({ locale, currency } = { locale: 'pt-BR', currency: 'BRL' }) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  })
}

const groupBy = (array, key, makeCurrentKey) => {
  return array.reduce((acumulated, item) => {
    const currentKey = makeCurrentKey(item, key)
    return {
      ...acumulated,
      [currentKey]: [
        ...(acumulated[currentKey] || []),
        item
      ]
    }
  }, {})
}

const idx = (object, keyPath) => {
  const keys = keyPath.split('.')
  return keys.reduce((obj, current) => {
    if (obj && obj[current] !== undefined) {
      return obj[current]
    }
    return null
  }, object)
}

// eslint-disable-next-line no-unused-vars
const generateColors = (length) => {
  const palletes = Object.keys(colors).filter(pallete => pallete !== 'shades').sort()

  const tones = [
    'base',
    'darken1',
    'darken2',
    'darken3',
    'darken4',
    'lighten1',
    'lighten2',
    'lighten3',
    'lighten4'
  ]

  let currentPallete = 0
  // eslint-disable-next-line prefer-const
  let currentTone = 0
  return Array(length).fill().map((item, index) => {
    // eslint-disable-next-line no-unused-vars
    const color = colors[palletes[currentPallete]][tones[currentTone]]
    currentPallete++
    if ((index + 1) % palletes.length === 0) {
      currentPallete = 0
      currentTone++
    }
    return color
  })
}

const generateChartOptions = (type) => {
  let tooltips = {}

  switch (type) {
    case 'bar':
      tooltips = {
        callbacks: {
          title () { },
          label (tooltip, data) {
            return data.datasets[tooltip.datasetIndex].label
          }
        }
      }
      break
  }
  const scales = {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }

  return {
    scales,
    tooltips
  }
}

const generateChartData = ({ items, keyToGroup, keyOfValue, aliases, type, backgroundColors }) => {
  const grouped = groupBy(items, keyToGroup, idx)
  const response = {}

  for (const key in grouped) {
    response[(aliases && aliases[key]) || key] = grouped[key].reduce((acc, item) => acc + item[keyOfValue], 0)
  }

  const labels = Object.keys(response)

  switch (type) {
    case 'bar':
      return {
        datasets: labels.map((label, index) => ({
          label: `${label}: ${currencyFormatter().format(response[label])}`,
          data: [response[label]],
          backgroundColor: backgroundColors[index],
          borderWidth: 0
        }))
      }
    case 'doughnut':
      return {
        datasets: [{
          data: labels.map(label => response[label]),
          backgroundColor: backgroundColors || generateColors(190),
          borderWidth: 0
        }],
        labels: items.length > 0 ? labels : []
      }
  }
}

const generateChartConfigs = (opts) => {
  const { type } = opts
  const data = generateChartData(opts)
  const options = generateChartOptions(type)

  return { type, data, options }
}

const registerVuexModule = (rootStore, moduleName, store) => {
  if (!(moduleName in rootStore._modules.root._children)) {
    rootStore.registerModule(moduleName, store)
  }
}

export {
  formatError,
  currencyFormatter,
  groupBy,
  registerVuexModule,
  generateChartConfigs
}
