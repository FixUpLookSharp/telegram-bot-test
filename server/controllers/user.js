const UserModel = require('../../app/Models/User')


class User {
   async getUsers(res, req) {
      return res.json(await UserModel.findAll());
   }
}


module.exports = User