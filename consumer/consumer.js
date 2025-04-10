// consumer.js
const amqp = require('amqplib');
const mongoose = require('mongoose');

const rabbitURL = process.env.RABBIT_URL || 'amqp://localhost';
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/mernApp';


mongoose.connect(mongoURL);

// Model
const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model('Item', ItemSchema);
// Function to consume messages from a Direct Exchange
async function startConsumerForDirectExchange(routingKey) {
  const connection = await amqp.connect(rabbitURL);
  const channel = await connection.createChannel();
  const exchange = 'direct_exchange';
  const queue = 'item_queue'; // Queue to consume messages from

  await channel.assertExchange(exchange, 'direct', { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, routingKey); // Binding queue to exchange with routing key

  console.log('[*] Waiting for messages in %s...', queue);

  channel.consume(queue, async(msg) => {
    const data = JSON.parse(msg.content.toString());
    console.log('[x] Received:', data.name);
    const newItem = new Item(data);
    await newItem.save();
    channel.ack(msg);
  });
}

// Function to consume messages from a Fanout Exchange
async function startConsumerForFanoutExchange() {
  const connection = await amqp.connect(rabbitURL);
  const channel = await connection.createChannel();
  const exchange = 'fanout_exchange';
  const queue = 'item_queue'; // Queue to consume messages from

  await channel.assertExchange(exchange, 'fanout', { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange); // No routing key needed for fanout exchange

  console.log('[*] Waiting for messages in %s...', queue);

  channel.consume(queue,async (msg) => {
    const data = JSON.parse(msg.content.toString());
    console.log('[x] Received:', data.name);
    const newItem = new Item(data);
    await newItem.save();
    channel.ack(msg);
  });
}

// Function to consume messages from a Topic Exchange
async function startConsumerForTopicExchange(routingKeyPattern) {
  const connection = await amqp.connect(rabbitURL);
  const channel = await connection.createChannel();
  const exchange = 'topic_exchange';
  const queue = 'item_queue'; // Queue to consume messages from

  await channel.assertExchange(exchange, 'topic', { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, routingKeyPattern); // Binding queue to exchange with routing key pattern

  console.log('[*] Waiting for messages in %s...', queue);

  channel.consume(queue, async(msg) => {
    const data = JSON.parse(msg.content.toString());
    console.log('[x] Received:', data.name);
    const newItem = new Item(data);
    await newItem.save();
    channel.ack(msg);
  });
}

startConsumerForDirectExchange('item.create');
// startConsumerForFanoutExchange();
// startConsumerForTopicExchange('item.#');

// Exporting functions
module.exports = {
  startConsumerForDirectExchange,
  startConsumerForFanoutExchange,
  startConsumerForTopicExchange,
};
