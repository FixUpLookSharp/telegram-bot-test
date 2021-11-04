import { Router } from 'express'
// import UserController from "../Controllers/UserController";
import AuthController from '../Controllers/AuthController'
const router = Router()

// auth
router.post('/login', AuthController.login)

export default router
