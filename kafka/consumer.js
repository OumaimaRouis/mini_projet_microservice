const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'social-media-consumer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'social-media-group' });

async function connect() {
  await consumer.connect();
  console.log('Consumer connected');
}

async function consumeMessages(topic) {
  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(`Received message: ${message.value}`);
    },
  });
}

module.exports = {
  connect,
  consumeMessages,
};