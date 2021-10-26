const UserModel = require('../../Models/User')
const TableModel = require('../../Models/Table')
const {freeTables} = require('../../../options')
const TableRender = require('../Render/TableRender')
const moment = require('moment')
const {Op} = require('sequelize')



class StartCommand extends TableRender {
    /**
     * 
     * @param bot
     */
    constructor(bot) {
        super()
        this.bot = bot
    }

    getCommand() {
        return {command: '/start', description: 'Начальное приветствие'}
    }

    isMyMessage(msg) {
        return msg.text == '/start'
    }

    isMyQuery(msg) {
        return msg.data == 'allFreeTables'
    }

    async handleMessage(msg) {
        let chatId = msg.chat.id
        let user_name = msg.chat.username
        let first_name = msg.chat.first_name
        const user = await UserModel.findOne({where: {chat_id: `${chatId}`}})
        if (user === null) {
            await UserModel.create({first_name: first_name, user_name: user_name, chat_id: chatId})
        }
        await this.bot.sendMessage(chatId, 'Добро пожаловать в кальянную номер 1')
        await this.bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', freeTables)
    }

    async handleQuery(msg) {
        this.renderTable(msg)
    }

    async renderTable(msg) {
        let chatId = msg.message.chat.id
        await this.bot.deleteMessage(chatId, msg.message.message_id);
        await this.bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', await this.getTables())
    }

}

module.exports = StartCommand