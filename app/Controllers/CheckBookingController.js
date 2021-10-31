import {Table} from '../Models/Table'
import moment from 'moment'
import pkg from 'sequelize';
const {Op} = pkg;
export default class CheckBookingController {
    /**
     *
     * @param bot
     */
    constructor(bot) {
        this.bot = bot
    }

    async checkBooking() {

        let currentDate = moment().format('YYYY-MM-DD HH:mm:ss')
        let tables = await Table.findAll(
            {where: {
                    booking_time_before: {
                        [Op.lte]: currentDate
                    }
                }}
        )
        let chatId = null
        for(let table of tables) {
            if (table) {
                chatId = (await table.getUser()).chat_id
                table.status = 'свободно'
                table.booking_time_before = null
                table.userId = null
                await table.save()
                await this.bot.sendMessage(chatId, "Время вашего бронирования истекло!")
            }
        }
    }

    checkStart() {
        let that = this
        let timerCheckBooking = setTimeout(async function tick() {
           await that.checkBooking()
            timerCheckBooking = setTimeout(tick, 60000); // (*)
        }, 2000);
    }
}

