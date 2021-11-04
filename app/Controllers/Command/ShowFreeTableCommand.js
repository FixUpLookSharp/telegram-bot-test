import TableRender from '../Render/TableRender'

export default class ShowFreeTableCommand extends TableRender {
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

    isMyMessage (msg) {
        return msg.text === '/free_tables'
    }

    isMyQuery(msg) {
        return msg.data === 'allFreeTables'
    }

    async handleMessage(msg) {
        await this.renderTable(msg)
    }

    async handleQuery(msg) {
        await this.renderTable(msg)
    }

    async renderTable(msg) {
        const chatId = msg.chat.id
        await this.bot.sendMessage(chatId, 'Забронируйте удобный для вас столик', await this.getTables())
    }
}
