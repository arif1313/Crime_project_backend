import express from "express"
import { centerPoliceControler } from "./CenterfPolis.controler"
const router= express.Router()
router.post('/create-centerPolice',centerPoliceControler.createCenterPolice)
router.get('/',centerPoliceControler.getCenterPoliceById)
router.put("/update/:userId", centerPoliceControler.updateCenterPolice);
router.delete('/delete/:userId', centerPoliceControler.softDeleteCenterPolice);
router.patch("/restore/:userId", centerPoliceControler.restoreCenterPolice);
export const centerPoliceRoutes=router