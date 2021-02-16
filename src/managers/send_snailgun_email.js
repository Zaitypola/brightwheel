'use strict'

const axios = require('axios')

const transformBodyHtml = require('./transform_body_html')

const config = require('config')

module.exports = async emailBody => {
    const url = config.snailgun.url
    const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': config.snailgun.api_key
    }

    try {
        const data = {
            from_email: emailBody.from,
            from_name: emailBody.from_name,
            to_email: emailBody.to,
            to_name: emailBody.to_name,
            subject: emailBody.subject,
            body: transformBodyHtml(emailBody.body)
        }

        console.log(`Sending ${JSON.stringify(data, undefined, 2)} to Snailgun`)

        const { status, statusText, data: responseData } = await axios.post(url, data, { headers })

        console.log('Snailgun response', status, statusText, responseData)

        return {statusCode: 202, msg: 'Email accepted for processing'}
    } catch (error) {
        console.log('Error while sending email with Snailgun', error.toJSON())
        throw new Error('Snailgun email error')
    }
}