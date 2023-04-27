'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const test_data = this.mongo.db.collection('test').find({}).toArray();
    return test_data
  })
}
