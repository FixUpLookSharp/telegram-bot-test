require("dotenv").config()
const TelegramApi = require('node-telegram-bot-api')
const token = process.env.TOKEN

const sequelize = require('./db')
const bot = new TelegramApi(token, {polling: true})

const CommandController =  require('./app/Controllers/CommandController')
const CheckBookingController =  require('./app/Controllers/CheckBookingController')
const TablesSeeder = require('./app/Seeders/TablesSeeder');

const CheckBooking = new CheckBookingController(bot)
const Command = new CommandController(bot);
const tablesSeeder = new TablesSeeder();
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