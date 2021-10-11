const TelegramApi = require('node-telegram-bot-api')
const token = '1994806150:AAEmy6WyWmn-dpmWOFPpMIf1EgrfA8n0DPY'

const {freeTables} = require('./tables')

const bot = new TelegramApi(token, {polling: true})


const start = async () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
    ])

    //Основное
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === '/start') {
            await bot.sendMessage(chatId, 'Добро пожаловать в кальянную номер 1')
            return  bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', freeTables)
        }

        return bot.sendMessage(chatId, 'Я вас не понимаю, попробуйте еще раз!')
    })


    //Обработка событий от кнопок
    bot.on('callback_query', async msg => {
        const chatId = msg.message.chat.id
        const data = msg.data
        console.log(data)
    })
}


start()