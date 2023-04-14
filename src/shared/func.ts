export const isoDateToFormatDate = (isoDate: string) => {
  const jsDate = new Date(isoDate)
  return jsDate
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
    .replace(/\//g, '.')
}
