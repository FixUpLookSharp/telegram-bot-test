import { User } from '../../Models/User'
import { Table } from '../../Models/Table'
import { cancel } from '../../../options'
import moment from 'moment'

export default class RegisterTableCommand {
    /**
     *
     * @param bot
     */
    constructor (bot) {
        this.bot = bot
    }

    getCommand () {
        return false
    }

    isMyMessage (msg) {
        return false
    }

    isMyQuery (msg) {
        return msg.data.includes('register_table-')
    }

    async handleMessage (msg) {

    }

    async handleQuery (msg) {
        const chatId = msg.message.chat.id
        const data = msg.data.substr(15)
        await this.bot.deleteMessage(chatId, msg.message.message_id)
        const user = await User.findOne(
            { where: { chat_id: `${chatId}` } }
        )
        const table = await Table.findOne(
            { where: { id: data } }
        )

        if (table.status === 'занят' && !await user.getTable()) {
            await this.bot.sendMessage(chatId, 'Данный стол уже занят, выберете другой свободный столик!')
            return
        }

        if (await user.getTable()) {
            await this.bot.sendMessage(chatId, 'За вами уже забронирован столик - ' + (await user.getTable()).table_name)
            await this.bot.sendMessage(chatId, 'Если хотите отменить бронирование нажмите "Отмена"', cancel)
            return
        }
        try {
            table.status = 'занят'
            table.booking_time_before = moment().add(4, 'hours').format('YYYY-MM-DD HH:mm:ss')
            await table.save()
            await user.setTable(table)
        } catch (e) {
            console.log(e)
        }

        await this.bot.sendMessage(chatId, 'Вы забронировали столик - ' + table.table_name)
        await this.bot.sendMessage(chatId, 'Время бронирование действует в течении 4 часов')
        await this.bot.sendMessage(chatId, 'Если хотите отменить бронирование нажмите "Отмена"', cancel)
    }
}
