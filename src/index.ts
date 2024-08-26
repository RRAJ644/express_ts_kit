import express, { Application, Request, Response } from 'express'
import 'dotenv/config'
import cors from 'cors'
import { connectKafkaProducer } from './config/kafka.config.js'
import { consumeMessages, produceMessage } from './helper.js'
const app: Application = express()
const PORT = process.env.PORT || 7000

// * Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
  return res.send("It's working 🙌")
})

app.post('/', async (req: Request, res: Response) => {
  const { body } = req
  await produceMessage('learning', body)
  return res.json({ message: 'Data add successfully' })
})

// connecting kafka producer
connectKafkaProducer().catch((err) => console.log(err))

consumeMessages('learning').catch((err) => console.log(err))

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))
