export function kebabToCamelCase (kebabCaseString) {
  return kebabCaseString.replace(/-([a-z])/g, function (match, letter) {
    return letter.toUpperCase()
  })
}

export function camelCaseToWords (camelCaseString) {
  const words = camelCaseString.replace(/([A-Z])/g, ' $1')

  return words.charAt(0).toUpperCase() + words.slice(1)
}

export const minDate = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(':'))

export const localDate = (UTCDate) => {
  const localDate = new Date(UTCDate)

  const year = localDate.getFullYear()
  const month = ('0' + (localDate.getMonth() + 1)).slice(-2)
  const day = ('0' + localDate.getDate()).slice(-2)
  const hours = ('0' + localDate.getHours()).slice(-2)
  const minutes = ('0' + localDate.getMinutes()).slice(-2)

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`

  return formattedDate
}
