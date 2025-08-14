import express from "express"

import { LocalPoliceControler } from "./Localpolice.controler"

const router= express.Router()
router.post('/create-localPolice',LocalPoliceControler.createLocalPolice)
router.get('/',LocalPoliceControler.getLocalPoliceById)
router.get('/',LocalPoliceControler.getallLocalPolice)
router.put("/update/:userId", LocalPoliceControler.updateLocalPolice);
router.delete('/delete/:userId', LocalPoliceControler.deleteLocalPolice);
export const localPoliceRoutes=router