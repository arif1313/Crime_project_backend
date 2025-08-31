import express from "express"
import { LocalUserControler } from "./LocalUser.controler"
const router= express.Router()
router.post('/create-localuser',LocalUserControler.createLocalUser)
router.get('/',LocalUserControler.getLocalUserById)

router.put("/update/:userId", LocalUserControler.updateLocalUser);
router.delete('/delete/:userId', LocalUserControler.softDeleteLocalUser);

router.patch("/restore/:userId", LocalUserControler.restoreLocalUser);


router.get("/search/role/:role", LocalUserControler.searchByRole);
router.get("/search/status/:status", LocalUserControler.searchByStatus);
router.get("/search/isDeleted/:isDeleted", LocalUserControler.searchByIsDeleted);
router.get("/search/isBlocked/:isBlocked", LocalUserControler.searchByIsBlocked);
router.get("/search/contact/:contactNumber", LocalUserControler.searchByContactNumber);
router.get("/search/:searchTerm", LocalUserControler.combinedLiveSearch);
export const LocalUserRoutes=router

