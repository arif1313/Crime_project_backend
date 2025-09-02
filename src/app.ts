import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import { UserRoutes } from './modules/User/user.routes'

const app: Application = express()

app.use(express.json())
app.use(cors())
//application routes
app.use('/api/v1/user',UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('this is my crime alert project ')
})

export default app
