'use strict'

const htmlTagRegexp = /<[^>]*>/g

module.exports = htmlString => htmlString.replace(htmlTagRegexp, ' ')