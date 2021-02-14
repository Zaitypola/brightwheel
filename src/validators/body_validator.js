'use strict'

const Ajv = require("ajv").default

const validator = new Ajv({ allErrors: true })

const addFormats = require('ajv-formats')

addFormats(validator)

module.exports = schema => (req, res, next) => {
    const emailBody = req.body

    const validate = validator.compile(schema)
    const result = validate(emailBody)

    if (result) {
        return next()
    } else {
        console.log('Error in email body validation', validate.errors)
        res.send(400, {errors: validate.errors})
        return next(false)
    }
}
