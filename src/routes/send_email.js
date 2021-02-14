'use strict'

const config = require('config')

const emailServices = require('../managers/send_email_func')

/*
* Sends email to a given provider, of the two.
* A config change should switch one over the other.
* */

module.exports = async (req, res, next) => {
    const emailService = config.EMAIL_SERVICE
    const emailFunc = emailServices[emailService]
    const emailBody = req.body

    try {
        const { statusCode, msg } = await emailFunc(emailBody)
        console.log('Email sent successfully')
        res.send(statusCode, {
            info: msg
        })
    } catch (error) {
        console.log('Error when sending email', error)
        res.send(500)
    }

    return next()
}