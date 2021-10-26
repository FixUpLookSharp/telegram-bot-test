const UserModel = require('../../Models/User')
const TableModel = require('../../Models/Table')

class CancelTableCommand {
    /**
     *
     * @param bot
     */
    constructor(bot) {
        this.bot = bot
    }

    getCommand() {
        return false
    }

    isMyMessage(msg) {
        return false
    }

    isMyQuery(msg) {
        return msg.data == 'cancel'
    }

    async handleMessage(msg) {

    }

    async handleQuery(msg) {
        const chatId = msg.message.chat.id
        await this.bot.deleteMessage(chatId, msg.message.message_id);
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

        await this.bot.sendMessage(chatId, 'Бронирование отменено, до новых встречь!')
}


}

module.exports = CancelTableCommand