require("dotenv").config()
const TelegramApi = require('node-telegram-bot-api')
const token = process.env.TOKEN

const {freeTables, cancel} = require('./options')
const sequelize = require('./db')
const bot = new TelegramApi(token, {polling: true})

const moment = require('moment');

const CommandController =  require('./app/Controllers/CommandController')
const CC = new CommandController();
const UserModel = require('./app/Models/User')
const TableModel = require('./app/Models/Table')

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
        const mm = 'cвободно'
        const user = await UserModel.findOne({where: {chat_id: `${chatId}`}})


        if (command === '/start') {
            if (user === null) {
                await UserModel.create({first_name: first_name, user_name: user_name, chat_id: chatId})
            }
            await bot.sendMessage(chatId, 'Добро пожаловать в кальянную номер 1')
            return  bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', freeTables)
        }

        if (command == '/free_tables') {
            return  bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', await CC.getTables())
        }

        return bot.sendMessage(chatId, 'Я вас не понимаю, попробуйте еще раз!')
    })


    //Обработка событий от кнопок
    bot.on('callback_query', async msg => {
        const chatId = msg.message.chat.id
        const data = msg.data

        if (data == 'allFreeTables') {
            await bot.deleteMessage(chatId, msg.message.message_id);
            return  bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', await CC.getTables())
        }

        for (let i = 1; i <= 9; i++) {
            if (i == data) {
                let user =  await UserModel.findOne(
                    {where : {chat_id: `${chatId}`}}
                );
                let table = await TableModel.findOne(
                    {where : {id: data}}
                );
                await bot.deleteMessage(chatId, msg.message.message_id)

                if (await user.getTable()) {
                    await  bot.sendMessage(chatId, 'За вами уже забронирован столик - ' + (await user.getTable()).table_name)
                    return  bot.sendMessage(chatId, 'Если хотите отменить бронирование нажмите "Отмена"', cancel)
                }
                table.status = 'занят'
                table.booking_time_before = moment.now()
                await table.save()
                await user.setTable(table)

                await bot.sendMessage(chatId, 'Вы забронировали столик - ' + table.table_name)
                await bot.sendMessage(chatId, 'Время бронирование действует в течении 4 часов')
                return  bot.sendMessage(chatId, 'Если хотите отменить бронирование нажмите "Отмена"', cancel)

            }
        }

        if (data == 'cancel') {
            await bot.deleteMessage(chatId, msg.message.message_id);
            let user =  await UserModel.findOne(
                {where : {chat_id: `${chatId}`}}
            );
            let tableId = (await user.getTable()).id
            let table = await TableModel.findOne(
                {where: {id: tableId}}
            )

            table.status = 'свободно'
            table.booking_time_before = null
            table.userId = null
            await table.save()

            return bot.sendMessage(chatId, 'Бронирование отменено, до новых встречь!')
        }


    })


}


start()