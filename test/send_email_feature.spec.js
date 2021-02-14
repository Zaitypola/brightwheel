'use strict'

const config = require('config')
const service = require('../src/service')

const {expect} = require('chai')
const nock = require('nock')

const sendEmail = require('./api/send_email')

const nockSendSpendgridEmail = require('./resources/mocks/nock_send_spendgrid_email')
const nockSendSnailgunEmail = require('./resources/mocks/nock_send_snailgun_email')

describe('Tests feature to send emails', () => {
    before(async () => {
        service.start(config.PORT)
    })

    after(async () => {
        service.stop()
    })

    beforeEach(() => {
        nock.cleanAll()
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it('Sends email through spendgrid', async () => {
        config.EMAIL_SERVICE = 'spendgrid'

        nockSendSpendgridEmail()

        try {
            const { status } = await sendEmail({
                to: 'example@example.com',
                to_name: 'example',
                from: 'example@example.com',
                from_name: 'example',
                subject: 'example subject',
                body: 'example body'
            })

            expect(status).to.equal(200)
        } catch (error) {
            expect(error).to.not.exist()
        }
    })

    it('Sends email through spendgrid - server error', async () => {
        config.EMAIL_SERVICE = 'spendgrid'

        nockSendSpendgridEmail({ statusCode: 500, body: {} })

        try {
            await sendEmail({
                to: 'example@example.com',
                to_name: 'example',
                from: 'example@example.com',
                from_name: 'example',
                subject: 'example subject',
                body: 'example body'
            })
        } catch (error) {
            const { status } = error.response

            expect(status).to.equal(500)
        }
    })

    it('Sends email through snailgun', async () => {
        config.EMAIL_SERVICE = 'snailgun'

        nockSendSnailgunEmail()

        try {
            const { status } = await sendEmail({
                to: 'example@example.com',
                to_name: 'example',
                from: 'example@example.com',
                from_name: 'example',
                subject: 'example subject',
                body: 'example body'
            })

            expect(status).to.equal(202)
        } catch (error) {
            expect(error).to.not.exist()
        }
    })

    it('Sends email through snailgun - server error', async () => {
        config.EMAIL_SERVICE = 'snailgun'

        const nockSendEmail = nockSendSnailgunEmail({ statusCode: 500, body: {} })

        try {
            await sendEmail({
                to: 'example@example.com',
                to_name: 'example',
                from: 'example@example.com',
                from_name: 'example',
                subject: 'example subject',
                body: 'example body'
            })
        } catch (error) {
            const { status } = error.response

            expect(status).to.equal(500)
            nockSendEmail.done()
        }
    })

    it('Sends email through snailgun - bad request - empty body', async () => {
        config.EMAIL_SERVICE = 'snailgun'

        nockSendSnailgunEmail()

        try {
            await sendEmail({})
        } catch (error) {
            const {status, statusText, data} = error.response

            expect(status).to.equal(400)
            expect(statusText).to.equal('Bad Request')
            expect(data.errors.some(error => error.message === "should have required property 'to'")).to.equal(true)
            expect(data.errors.some(error => error.message === "should have required property 'to_name'")).to.equal(true)
            expect(data.errors.some(error => error.message === "should have required property 'from'")).to.equal(true)
            expect(data.errors.some(error => error.message === "should have required property 'from_name'")).to.equal(true)
            expect(data.errors.some(error => error.message === "should have required property 'subject'")).to.equal(true)
            expect(data.errors.some(error => error.message === "should have required property 'body'")).to.equal(true)
        }
    })
})