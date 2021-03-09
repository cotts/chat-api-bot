#!/usr/bin/env node
import amqp from 'amqplib'
import dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.RABBITMQ_SERVER
const queue = process.env.RABBITMQ_QUEUE

const connect = () =>
  amqp.connect(connectionString).then((conn) => conn.createChannel())
