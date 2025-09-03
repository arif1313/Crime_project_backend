import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import { UserRoutes } from './modules/User/user.routes'
import { AuthRoutes } from './modules/User/auth.route'
import { LocalUserRouters } from './modules/LocalUser/LocalUser.router'

const app: Application = express()

app.use(express.json())
app.use(cors())
//application routes
app.use('/api/v1/user',UserRoutes)
app.use('/api/v1/auth',AuthRoutes)

app.use('/api/v1/local-user',LocalUserRouters)
app.get('/', (req: Request, res: Response) => {
  res.send('this is my crime alert project ')
})

export default app
