import { Router } from 'express'
const router = Router()
import UserModel from '../../app/Models/User'
// const UserController = require('../controllers/user')
// const user = new UserController()

router.post('/all-users',  async (req, res) => {
     res.json(await UserModel.findAll());
})

// module.exports = router

