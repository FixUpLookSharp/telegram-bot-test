const UserModel = require('../../Models/User')
const TableModel = require('../../Models/Table')
const TableRender = require('../Render/TableRender')

class ShowFreeTableCommand extends TableRender {
    /**
     *
     * @param bot
     */
    constructor(bot) {
        super()
        this.bot = bot
    }

    getCommand() {
        return {command: '/free_tables', description: 'Свободные столики'}
    }

    isMyMessage(msg) {
        return msg.text == '/free_tables'
    }

    isMyQuery(msg) {
        return msg.data == 'allFreeTables'
    }

    async handleMessage(msg) {
        this.renderTable(msg)
    }

    async handleQuery(msg) {
        this.renderTable(msg)
    }

    async renderTable(msg) {
        let chatId = msg.chat.id
        await this.bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', await this.getTables())
    }
}


module.exports = ShowFreeTableCommand