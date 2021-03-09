#!/usr/bin/env node
import amqp from 'amqplib'
import dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.RABBITMQ_SERVER
const queue = process.env.RABBITMQ_QUEUE

/**
 * Connect to RABBITMQ Server
 * @returns {RabbitMQ Channel}
 */
const connect = () =>
  amqp.connect(connectionString).then((conn) => conn.createChannel())

/**
 * Create RabbitMQ Queue
 * @param {RabbitMQ Channel} channel
 * @param {RabbitMQ Queue} queue
 * @returns {Channel Queue}
 */
const createQueue = (channel, queue) =>
  new Promise((resolve, reject) => {
    try {
      channel.assertQueue(queue, { durable: true })
      resolve(channel)
    } catch (err) {
      reject(err)
    }
  })

/**
 * Producer - Send message to RabbitMQ Channel Queue
 * @param {Channel Queue} queue
 * @param {String} message
 */
const sendToQueue = (queue, message) =>
  connect()
    .then((channel) => createQueue(channel, queue))
    .then((channel) => channel.sendToQueue(queue, Buffer.from(message)))
    .catch(console.log)

/**
 * Consumer - read messages from Channel Queue
 * @param {Channel Queue} queue
 * @param {Callback} callback
 */
const consume = (queue, callback) =>
  connect()
    .then((channel) => createQueue(channel, queue))
    .then((channel) => channel.consume(queue, callback, { noAck: true }))
    .catch(console.log)
