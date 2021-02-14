'use strict'

const config = require('config')
const restify = require('restify')
const server = restify.createServer()

const bodyValidator = require('./validators/body_validator')
const sendEmail = require('./routes/send_email')
const emailBodySchema = require('./schemas/send_email_body')

server.use(restify.plugins.bodyParser())

server.get('/', (req, res, next) => {
    res.send('Hello world!')
    return next()
})

server.post('/api/email', bodyValidator(emailBodySchema), sendEmail)

module.exports = {
    start: (port) => {
        server.listen(port, () => {
            console.log(`Server listening on ${port} - email service picked: ${config.EMAIL_SERVICE}`)
        })
    },
    stop: () => {
        server.close(() => {
            console.log('Server stopped')
        })
    }
}