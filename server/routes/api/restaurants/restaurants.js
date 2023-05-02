'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
      const restaurants = await this.mongo.db.collection('restaurants').find({}).toArray()

      reply.send(restaurants)
  })
}