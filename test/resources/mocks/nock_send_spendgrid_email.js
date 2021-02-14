'use strict'

const nock = require('nock')
const config = require('config')

module.exports = response => {
    if (!response) {
        response = {
            statusCode: 200,
            body: {}
        }
    }
    return nock(config.spendgrid.url)
        .post('')
        .reply(response.statusCode, response.body)
}