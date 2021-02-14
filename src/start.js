'use strict'

const service = require('./service')
const config = require('config')

service.start(config.PORT)