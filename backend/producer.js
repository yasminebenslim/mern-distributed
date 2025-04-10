// producer.js
const amqp = require('amqplib');

const rabbitURL = process.env.RABBIT_URL || 'amqp://localhost';

// Function to send a message to a Direct Exchange
async function sendToDirectExchange(data, routingKey) {
  const connection = await amqp.connect(rabbitURL); 
  const channel = await connection.createChannel();
  const exchange = 'direct_exchange';

  await channel.assertExchange(exchange, 'direct', { durable: true });

  // Send message to the exchange with a routing key
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)), {
    persistent: true,  // Ensure the message is persisted
  });

  console.log('[x] Sent item to direct exchange with routing key:', routingKey);
  setTimeout(() => connection.close(), 500);
}

// Function to send a message to a Fanout Exchange
async function sendToFanoutExchange(data) {
  const connection = await amqp.connect(rabbitURL); 
  const channel = await connection.createChannel();
  const exchange = 'fanout_exchange';

  await channel.assertExchange(exchange, 'fanout', { durable: true });

  // Send message to the exchange without routing key (broadcast)
  channel.publish(exchange, '', Buffer.from(JSON.stringify(data)), {
    persistent: true,  // Ensure the message is persisted
  });

  console.log('[x] Sent item to fanout exchange');
  setTimeout(() => connection.close(), 500);
}

// Function to send a message to a Topic Exchange
async function sendToTopicExchange(data, routingKey) {
  const connection = await amqp.connect(rabbitURL); 
  const channel = await connection.createChannel();
  const exchange = 'topic_exchange';

  await channel.assertExchange(exchange, 'topic', { durable: true });

  // Send message to the exchange with a routing key
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)), {
    persistent: true,  // Ensure the message is persisted
  });

  console.log('[x] Sent item to topic exchange with routing key:', routingKey);
  setTimeout(() => connection.close(), 500);
}

// Exporting functions
module.exports = {
  sendToDirectExchange,
  sendToFanoutExchange,
  sendToTopicExchange,
};
