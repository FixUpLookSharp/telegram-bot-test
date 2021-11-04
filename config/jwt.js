import dotenv from 'dotenv'
dotenv.config()

export const JwtSecretKey = {
    secret: process.env.JWT_SECRET
}
