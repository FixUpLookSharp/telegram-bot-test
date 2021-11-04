import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const database = process.env.DB_DATABASE
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const db = process.env.DB_CONNECTION

export const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: host,
        port: port,
        dialect: db,
        dialectOptions: {
            useUTC: true
        },
        timezone: '+03:00'
    }
)
