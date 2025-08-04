import express from "express"

import { LocalPoliceControler } from "./Localpolice.controler"

const router= express.Router()
router.post('/create-centerPolice',LocalPoliceControler.createLocalPolice)
export const localPoliceRoutes=router