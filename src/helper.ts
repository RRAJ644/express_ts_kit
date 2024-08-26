import { consumer, producer } from './config/kafka.config.js'

export const produceMessage = async (topic: string, data: any) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(data) }],
  })
}

export const consumeMessages = async (topic: string) => {
  await consumer.connect()
  await consumer.subscribe({ topics: [topic], fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const parsedData = JSON.parse(message.value.toString())
      console.log({
        partition,
        offset: message.offset,
        value: parsedData,
      })
    },
  })
}
