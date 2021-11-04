import { Router } from 'express'
import {User} from '../../app/Models/User'
import UserController from "../Controllers/UserController";
const router = Router()



router.post('/all-users', UserController.getAllUsers)


export default router

