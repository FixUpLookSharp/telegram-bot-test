import jwt from 'jsonwebtoken'
import { JwtSecretKey } from '../../config/jwt'

class AuthService {
    generateAccessToken (data, ttl) {
        const payload = data
        return jwt.sign(payload, JwtSecretKey, { expiresIn: ttl })
    }

    test () {
        return 'sadasdasdas'
    }
}

export default new AuthService()
