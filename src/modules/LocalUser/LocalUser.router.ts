import express from "express"
import { LocalUserControler } from "./LocalUser.controler"
const router= express.Router()
router.post('/create-localuser',LocalUserControler.createLocalUser)
export const LocalUserRoutes=router
