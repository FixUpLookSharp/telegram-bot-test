import {User} from "../../app/Models/User";

class UserController {
    async getAllUsers(req, res) {
        res.json(await User.findAll());
    }
}


export default new UserController()