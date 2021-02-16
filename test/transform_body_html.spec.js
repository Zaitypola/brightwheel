'use strict'

const transformBodyHtml = require('../src/managers/transform_body_html')

const { expect } = require('chai')

describe('Tests HTML body transformation', () => {
    const body = '<h1>Weekly Report</h1><p>You saved 10 hours this week!</p>'
    it('Transforms body sucessfully', () => {
        const res = transformBodyHtml(body)

        expect(res).to.equal(' Weekly Report  You saved 10 hours this week! ')
    })
})