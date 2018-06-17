'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_API_URL: '"http://localhost:3123"',
  COUCHDB_URL: '"http://127.0.0.1:5984"'
})
