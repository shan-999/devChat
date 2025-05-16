import express from 'express'
import  loginConroller  from '../controllers/loginController'
import {verifyTocken} from '../middleware/userAuth'
// import tockenService from '../controllers/tockenService'
import { createRefereshTocken, checkTocken } from '../controllers/tockenService';
import  userContoller  from '../controllers/userContorller';
const router = express.Router()


// router.get('/home',(req,res) =>{
//     res.send('yes its worked',)
// })



router.post('/sign-up',loginConroller.signUp)
router.post('/login',loginConroller.login)
router.post('/compleate-user-profile/:id',userContoller.compleateUserProfile)
router.post('/logout',loginConroller.logout)

router.get('/avail-users/:id',verifyTocken,userContoller.getAvileUser)
router.post('/addfriend/:id',verifyTocken,userContoller.addAFriend)
router.get('/get-user/:id',verifyTocken,userContoller.getUser)

router.get("/health", (req, res) => {
    res.json({ status: "Server is running" });
});


router.post('/samp',verifyTocken,loginConroller.smap)
router.post('/refresh-tocken',createRefereshTocken)
router.get('/checkTocken',checkTocken)
// router.post('/refresh-tocken',)



export default router