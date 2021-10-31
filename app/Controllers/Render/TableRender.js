import {Table} from '../../Models/Table'

export default class TableRender {
    async getTables() {
        const countTables = Object.keys(await Table.findAll()).length
        const tables =  await Table.findAll({
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

