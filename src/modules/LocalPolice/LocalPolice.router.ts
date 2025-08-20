import express from "express"

import { LocalPoliceControler } from "./Localpolice.controler"

const router= express.Router()
router.post('/create-localPolice',LocalPoliceControler.createLocalPolice)
router.get('/',LocalPoliceControler.getLocalPoliceById)
router.put("/update/:userId", LocalPoliceControler.updateLocalPolice);
router.delete("/delete/:userId", LocalPoliceControler.softDeleteLocalPolice);  // Soft delete
router.patch("/restore/:userId", LocalPoliceControler.restoreLocalPolice); 
export const localPoliceRoutes=router