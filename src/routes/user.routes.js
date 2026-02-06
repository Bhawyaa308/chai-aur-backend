import {Router} from 'express';
import {registerUser} from '../controllers/user.controller.js';
const router=Router();
// yaha aaya aage /api/v1/user likhne ke baad. ab / user ke baad /register call ho jaega is se 
router.route("/register").post(registerUser);
export default router;