import express from "express"
import { centerPoliceControler } from "./CenterfPolis.controler"

const router= express.Router()
router.post('/create-localuser',centerPoliceControler.createCenterPolice)
export const centerPoliceRoutes=router