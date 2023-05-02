'use strict'

const fp = require('fastify-plugin')

const {
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_HOST,
} = process.env

const connection_url = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:27017/${DATABASE_NAME}?authMechanism=DEFAULT&authSource=admin`

module.exports = fp(async function (fastify, opts) {
    console.log(`Connection to Mongo url : ${connection_url}`)
    
    fastify.register(require('@fastify/mongodb'), {
        forceClose: true,
        url: connection_url
    })
  })
  