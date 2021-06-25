const formatJson = (data) => {
  return JSON.parse(JSON.stringify(data))
}

module.exports = {
  formatJson
}