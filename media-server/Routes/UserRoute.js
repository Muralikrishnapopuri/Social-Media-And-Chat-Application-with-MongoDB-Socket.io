import express from 'express';
import { UnFollowUser, UpdateUser, deleteuser, followUser, getAlluser, getUser } from '../Controllers/UserController.js';
import authMiddleWare from '../MiddleWare/authMiddleWare.js';

const router = express.Router();

router.get('/',getAlluser)
router.get('/:id',getUser)
router.put('/:id',authMiddleWare, UpdateUser)
router.delete("/:id",authMiddleWare, deleteuser)
router.put('/:id/follow',authMiddleWare, followUser)
router.put("/:id/unfollow",authMiddleWare, UnFollowUser)
export default router