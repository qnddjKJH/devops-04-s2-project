'use strict'

const { ObjectId } = require('@fastify/mongodb')

const DELIVERY_STATUS = 'preparing'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    try {
      const orders = await this.mongo.db.collection('order').find({}).toArray()

      reply.send(orders)
    } catch (error) {
      reply.status(500).send({ error: error.message})
    }
  })

  fastify.get('/:id', async function (request, reply) {
    try {
      const order_id = new ObjectId(request.params.id)
      const order = await this.mongo.db.collection('order').findOne({ _id: order_id })
      
      reply.send(order)
    } catch (error) {
      reply.status(500).send({ error: error.message})
    }
  })

  fastify.post('/', async function(request, reply) {  
    try {
      const body = request.body
      console.log(`request body : ${JSON.stringify(body)}`)

      const customer = await this.mongo.db.collection('customer').findOne()

      const courier = await this.mongo.db.collection('courier').findOne({ available: true })

      const restaurant_id = new ObjectId(body.restaurantId)
      const restaurant = await this.mongo.db.collection('restaurants').findOne({ _id: restaurant_id })

      const orderedMenu = body.menu.map(m => {
        m.duration = m.quantity
        delete m.duration
        delete m._id
        m.quantity = 1

        return m
      })

      const order = {
        consumer_id: customer._id,
        restaurant: {
          name: restaurant.name,
          address: restaurant.address,
        },
        orderedMenu: orderedMenu,
        deliveryInfo: {
          status: DELIVERY_STATUS,
          assignedCourier: courier.courier,
          estimatedDeleveryTime: 40
        }
      }

      const collection = this.mongo.db.collection('order')
      const result = await collection.insertOne(order)

      const savedOrder = await collection.findOne({ _id: result.insertedId })

      reply.status(201).send(savedOrder)
    } catch (error) {
      reply.status(500).send({ error: error.message})
    }
  })
}