import express from "express"

import { LocalPoliceControler } from "./Localpolice.controler"

const router= express.Router()
router.post('/create-localPolice',LocalPoliceControler.createLocalPolice)
export const localPoliceRoutes=router