import express from 'express'
import  loginConroller  from '../controllers/loginController'
import {verifyTocken} from '../middleware/userAuth'
// import tockenService from '../controllers/tockenService'
import { createRefereshTocken, checkTocken } from '../controllers/tockenService';
const router = express.Router()


// router.get('/home',(req,res) =>{
//     res.send('yes its worked',)
// })



router.post('/sign-up',loginConroller.signUp)
router.post('/login',loginConroller.login)

router.get("/health", (req, res) => {
    res.json({ status: "Server is running" });
});


router.post('/samp',verifyTocken,loginConroller.smap)
router.post('/refresh-tocken',createRefereshTocken)
router.get('/checkTocken',checkTocken)
// router.post('/refresh-tocken',)



export default router