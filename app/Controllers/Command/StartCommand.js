import { User } from '../../Models/User'
import { freeTables } from '../../../options'
import TableRender from '../Render/TableRender'

export default class StartCommand extends TableRender {
    /**
     *
     * @param bot
     */
    constructor (bot) {
        super()
        this.bot = bot
    }

    getCommand () {
        return { command: '/start', description: 'Начальное приветствие' }
    }

    isMyMessage (msg) {
        return msg.text === '/start'
    }

    isMyQuery (msg) {
        return msg.data === 'allFreeTables'
    }

    async handleMessage (msg) {
        const chatId = msg.chat.id
        const userName = msg.chat.username
        const firstName = msg.chat.first_name
        const user = await User.findOne({ where: { chat_id: `${chatId}` } })
        if (user === null) {
            await User.create({ first_name: firstName, user_name: userName, chat_id: chatId })
        }
        await this.bot.sendMessage(chatId, 'Добро пожаловать в кальянную номер 1')
        await this.bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', freeTables)
    }

    async handleQuery (msg) {
        await this.renderTable(msg)
    }

    async renderTable (msg) {
        const chatId = msg.message.chat.id
        await this.bot.deleteMessage(chatId, msg.message.message_id)
        await this.bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', await this.getTables())
    }
}
