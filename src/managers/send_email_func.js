'use strict'

const sendSpendgridEmail = require('./send_spendgrid_email')
const sendSnailgunEmail = require('./send_snailgun_email')

const services = {
    spendgrid: emailBody => sendSpendgridEmail(emailBody),
    snailgun: emailBody => sendSnailgunEmail(emailBody)
}

module.exports = services