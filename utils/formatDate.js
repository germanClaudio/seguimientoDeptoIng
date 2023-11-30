const date = require('date-and-time')

function formatDate() {
    const dayNow = new Date()
    const rightNow = date.format(dayNow, 'DD-MM-YYYY_HH.mm.ss')
    return rightNow.toString()
  }

let now = formatDate()

module.exports = 
    now 