import express from "express"
import { LocalUserControler } from "./LocalUser.controler"
const router= express.Router()
router.post('/create-localuser',LocalUserControler.createLocalUser)
router.get('/',LocalUserControler.getLocalUserById)

router.put("/update/:userId", LocalUserControler.updateLocalUser);
router.delete('/delete/:userId', LocalUserControler.softDeleteLocalUser);

router.patch("/restore/:userId", LocalUserControler.restoreLocalUser);
export const LocalUserRoutes=router

