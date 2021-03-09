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
