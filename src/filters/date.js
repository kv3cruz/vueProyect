export default value => {
  const date = new Date(value)

  return date.toDateString(['en-US'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })
}
