import {User} from "../../app/Models/User";

class UserController {

    async getAllUsers(req, res) {
        // res.json(await User.findAll());
        // res.json(JwtSecretKey.secret);
    }
}


export default new UserController()