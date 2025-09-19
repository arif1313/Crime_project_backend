import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import { UserRoutes } from './modules/User/user.routes'
import { AuthRoutes } from './modules/User/auth.route'
import { LocalUserRouters } from './modules/LocalUser/LocalUser.router'
import { LocalPoliceStationRouters } from './modules/LocalPolice/LocalPolice.router'
import { ReportRouter } from './modules/Repor/Report.router'
import path from 'path'
import { ActionTeamRouter } from './modules/ActionTeam/ActionTeam.router'


const app: Application = express()

app.use(express.json())
app.use( cors({
    origin: "http://localhost:5173", // আপনার React frontend origin
    credentials: true,              // cookie / auth token allow করবে
  }))
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
//application routes
app.use('/api/v1/user',UserRoutes) 
app.use('/api/v1/auth',AuthRoutes)

app.use('/api/v1/local-user',LocalUserRouters)
app.use('/api/v1/local-police',LocalPoliceStationRouters)
app.use('/api/v1/report',ReportRouter)
app.use('/api/v1/actionTeam',ActionTeamRouter)
app.get('/', (req: Request, res: Response) => {
  res.send('this is my crime alert project ')
})

export default app
