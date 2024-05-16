const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'social-media-producer',
  brokers: ['localhost:9092'],
  createPartitioner: Partitioners.LegacyPartitioner,
});

const producer = kafka.producer();

async function connect() {
  await producer.connect();
  console.log('Producer connected');
}

async function sendMessage(topic, message) {
  await producer.send({
    topic,
    messages: [
      { value: JSON.stringify(message) },
    ],
  });
}

module.exports = {
  connect,
  sendMessage,
};
