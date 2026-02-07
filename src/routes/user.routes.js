import {Router} from 'express';
import {registerUser} from '../controllers/user.controller.js';
import {upload} from  "../middlewares/multer.middleware.js";
const router=Router();
// yaha aaya aage /api/v1/user likhne ke baad. ab / user ke baad /register call ho jaega is se 
router.route("/register").post(
    upload.fields([
      {
        name: "avatar",
        maxCount: 1
      },
      {
        name: "coverImage",
        maxCount: 1
      }

    ]),
    registerUser
);

export default router;