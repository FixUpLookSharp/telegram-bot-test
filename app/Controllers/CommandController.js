const UserModel = require('../Models/User')
const TableModel = require('../Models/Table')

class CommandController {
    async getTables()
    {
        const countTables = Object.keys(await TableModel.findAll()).length
        const tables =  await TableModel.findAll({
            attributes: ['id', 'status', 'table_name']
        })
        let allTable = []
        for (let i = 0; i < countTables; i++) {
            allTable.push([{text: tables[i].dataValues.table_name  + ' - ' +  tables[i].dataValues.status, callback_data: `${tables[i].dataValues.id}`}])
        }

        return {
            reply_markup: JSON.stringify({
                inline_keyboard: allTable,
            })
        }
    }
}

module.exports = CommandController