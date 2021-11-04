import { Table } from '../Models/Table'
import moment from 'moment'
import pkg from 'sequelize'
const { Op } = pkg
export default class CheckBookingController {
    /**
     *
     * @param bot
     */
    constructor (bot) {
        this.bot = bot
    }

    async checkBooking () {
        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss')
        const tables = await Table.findAll(
            {
                where: {
                    booking_time_before: {
                        [Op.lte]: currentDate
                    }
                }
            }
        )
        let chatId = null
        for (const table of tables) {
            if (table) {
                chatId = (await table.getUser()).chat_id
                table.status = 'свободно'
                table.booking_time_before = null
                table.userId = null
                await table.save()
                await this.bot.sendMessage(chatId, 'Время вашего бронирования истекло!')
            }
        }
    }

    checkStart () {
        const that = this
        // eslint-disable-next-line no-unused-vars
        let timerCheckBooking = setTimeout(async function tick () {
            await that.checkBooking()
            timerCheckBooking = setTimeout(tick, 60000) // (*)
        }, 2000)
    }
}
