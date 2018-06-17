const express = require('express')
const fs = require('fs')

const app = express()

const settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'))

app.use(function (req, res, next) {
  if (req.path === '/' && settings.defaultFile) {
    req.path = '/' + settings.defaultfile
  }
  next()
})

app.use(express.static(settings.wwwroot))

var server = app.listen(3120, function () {
    console.log('Server running on port', server.address().port);
})
