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

export {
  formatError,
  currencyFormatter,
  groupBy
}
