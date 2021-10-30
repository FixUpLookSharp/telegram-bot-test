require("dotenv").config()
const TelegramApi = require('node-telegram-bot-api')
const token = process.env.TOKEN

const sequelize = require('./db')
const bot = new TelegramApi(token, {polling: true})

const CommandController =  require('./app/Controllers/CommandController')
const CheckBookingController =  require('./app/Controllers/CheckBookingController')
const TablesSeeder = require('./app/Seeders/TablesSeeder');
// import TablesSeeder from './app/Seeders/TablesSeeder'

const CheckBooking = new CheckBookingController(bot)
const Command = new CommandController(bot);
const tablesSeeder = new TablesSeeder();

const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const app = express()
const routes = require('./server/routes/user')
const port = process.env.PORT || 3000
const hostname = process.env.HOSTNAME

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, './client/dist')));
// app.use('/api/v1', require('./server/routes/route'))
app.use('/api/v1', routes)

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