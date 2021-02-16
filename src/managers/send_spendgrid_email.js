'use strict'

const axios = require('axios')

const transformBodyHtml = require('./transform_body_html')

const config = require('config')

module.exports = async emailBody => {
    const url = config.spendgrid.url
    const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': config.spendgrid.api_key
    }

    try {
        const data = {
            sender: `${emailBody.from_name} <${emailBody.from}>`,
            recipient: `${emailBody.to_name} <${emailBody.to}>`,
            subject: emailBody.subject,
            body: transformBodyHtml(emailBody.body)
        }

        console.log(`Sending ${JSON.stringify(data, undefined, 2)} to Spendgrid`)

        const { status, statusText, data: responseData } = await axios.post(url, data, { headers })

        console.log('Spendgrid response', status, statusText, responseData)

        return { statusCode: 200, msg: 'Email successfully sent'}
    } catch (error) {
        console.log('Error while sending email with Spendgrid', error.message)
        throw new Error('Spendgrid email error')
    }
}