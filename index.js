import dotenv from 'dotenv'
dotenv.config()

import TelegramApi from 'node-telegram-bot-api'
const token = process.env.TOKEN

import {sequelize} from './db'

const bot = new TelegramApi(token, {polling: true})

import CommandController from './app/Controllers/CommandController'
import CheckBookingController from './app/Controllers/CheckBookingController'
import TablesSeeder from './app/Seeders/TablesSeeder'

const CheckBooking = new CheckBookingController(bot)
const Command = new CommandController(bot);
const tablesSeeder = new TablesSeeder();

import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
const app = express()
import router from './server/routes/user'
import { URL } from 'url'
const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

const port = process.env.PORT || 3000
const hostname = process.env.HOSTNAME

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, './client/dist')));
app.use('/api/v1', router)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"));
})

app.listen(port, hostname, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()
    }catch (e) {
        console.log('Подключение к бд сломалось', e)
    }
   // await tablesSeeder.seed();
    CheckBooking.checkStart()

    await bot.setMyCommands(Command.getCommands())

    bot.on('message', msg => {
        Command.HandleMessage(msg)
    })

    bot.on('callback_query', msg => {
        Command.HandleQuery(msg)
    })

}

start()