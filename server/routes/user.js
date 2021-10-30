const { Router } = require('express')
const router = Router()
const UserModel = require('../../app/Models/User')

router.post('/test', async (req, res) => {
    res.json(await UserModel.findAll());
})



module.exports = router