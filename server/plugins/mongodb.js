'use strict'

const fp = require('fastify-plugin')

const {
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_HOST,
} = process.env

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/mongodb'), {
        forceClose: true,

        url: `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:27017/${DATABASE_NAME}?authMechanism=DEFAULT&authSource=admin`
    })
  })
  