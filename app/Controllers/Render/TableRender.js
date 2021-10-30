const TableModel = require('../../Models/Table')

class TableRender {
    async getTables() {
        const countTables = Object.keys(await TableModel.findAll()).length
        const tables =  await TableModel.findAll({
            order: [
                ['id', 'ASC']
            ],
            attributes: ['id', 'status', 'table_name']
        })
        let allTable = []
        for (let i = 0; i < countTables; i++) {
            allTable.push([{text: tables[i].dataValues.table_name  + ' - ' +  tables[i].dataValues.status, callback_data: `register_table-${tables[i].dataValues.id}`}])
        }

        return {
            reply_markup: JSON.stringify({
                inline_keyboard: allTable,
            })
        }
    }
}

module.exports = TableRender