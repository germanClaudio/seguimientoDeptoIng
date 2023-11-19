const date = require('date-and-time')

function formatDate() {
    const dayNow = new Date()
    const rightNow = date.format(dayNow, 'DD-MM-YYYY_HH.mm.ss')
    return rightNow
  }

let now = formatDate()
// const dayNow = new Date();
// const now = date.format(dayNow, 'DD-MM-YYYY_HH.mm.ss')

module.exports = 
    now