require("dotenv").config()
const TelegramApi = require('node-telegram-bot-api')
const token = process.env.TOKEN

const {freeTables, tables, cancel} = require('./tables')
const sequelize = require('./db')
const bot = new TelegramApi(token, {polling: true})

const CommandController = require('./app/Controllers/CommandController')

const UserModel = require('./app/Models/User')
const TebleModel = require('./app/Models/Table')

const start = async () => {
    
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    }catch (e) {
        console.log('Подключение к бд сломалось', e)
    }
    
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/free_tables', description: 'Свободные столики'},
    ])

    //Основное
    bot.on('message', async msg => {
        let command = msg.text
        let chatId = msg.chat.id
        let user_name = msg.chat.username
        let first_name = msg.chat.first_name
        const mm = 'Свободно'

        if (command === '/start') {
            await bot.sendMessage(chatId, 'Добро пожаловать в кальянную номер 1')

            return  bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', freeTables)

            // await TebleModel.create({status: mm})
            // console.log(msg)
        }

        if (command == '/free_tables') {
            return  bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', tables)
        }

        return bot.sendMessage(chatId, 'Я вас не понимаю, попробуйте еще раз!')
    })


    //Обработка событий от кнопок
    bot.on('callback_query', async msg => {
        const chatId = msg.message.chat.id
        const data = msg.data

        if (data == 'allFreeTables') {
            bot.answerCallbackQuery({callback_query_id: msg.id})

            return  bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', tables)
        }

        for (let i = 1; i <= 9; i++) {
            if (i == data) {
                bot.answerCallbackQuery({callback_query_id: msg.id})

                // Нужно вытащить из базы имя забронированого стола и добавить к 1 отправке
                await bot.sendMessage(chatId, 'Вы забронировали столик')
                await bot.sendMessage(chatId, 'Время бронирование действует в течении 2 часов')
                return  bot.sendMessage(chatId, 'Если хотите отменить бронирование нажмите "Отмена"', cancel)
            }
        }
        if (data == 'cancel') {
            bot.answerCallbackQuery({callback_query_id: msg.id})

            return bot.sendMessage(chatId, 'Бронирование отменено')
        }


    })
}


start()