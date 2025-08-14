import express from "express"
import { LocalUserControler } from "./LocalUser.controler"
const router= express.Router()
router.post('/create-localuser',LocalUserControler.createLocalUser)
router.get('/',LocalUserControler.getLocalUserById)
router.get('/',LocalUserControler.getallLocalUser)
router.put("/update/:userId", LocalUserControler.updateLocalUser);
router.delete('/delete/:userId', LocalUserControler.deleteLocalUser);
export const LocalUserRoutes=router

