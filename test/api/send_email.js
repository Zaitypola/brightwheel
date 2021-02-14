'use strict'

const axios = require('axios')
const config = require('config')

module.exports = emailBody => {
    const url = `http://localhost:${config.PORT}/api/email`

    return axios.post(url, emailBody)
}