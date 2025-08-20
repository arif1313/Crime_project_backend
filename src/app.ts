import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { LocalUserRoutes } from './modules/LocalUser/LocalUser.router'
import { centerPoliceRoutes } from './modules/CenterPolice/CenterPolice.router'
import { ReportRoutes } from './modules/Repor/Report.router'
import { localPoliceRoutes } from './modules/LocalPolice/LocalPolice.router'

const app: Application = express()

app.use(express.json())
app.use(cors())
//application routes

app.use('/api/v1/localuser',LocalUserRoutes)
app.use('/api/v1/centerPolice',centerPoliceRoutes)
app.use('/api/v1/report',ReportRoutes) 
app.use('/api/v1/localPolice',localPoliceRoutes) 
app.get('/', (req: Request, res: Response) => {
  res.send('this is my crime alert project ')
})

export default app
