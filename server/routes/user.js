const { Router } = require('express')
const router = Router()
const UserModel = require('../../app/Models/User')
// const UserController = require('../controllers/user')
// const user = new UserController()
router.post('/all-users',  async (req, res) => {
     res.json(await UserModel.findAll());
})

module.exports = router

