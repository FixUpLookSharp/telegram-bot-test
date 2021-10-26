const TableModel = require('../Models/Table')
const {STATUS_FREE, STATUS_BUSY} = require('../Models/Table')

class TablesSeeder
{
   async seed() {
        let tables =
            [
                {table_name: 'У окна', status: STATUS_FREE},
                {table_name: 'На веранде', status: STATUS_FREE},
                {table_name: 'Зал №1', status: STATUS_FREE},
                {table_name: 'Вип комната', status: STATUS_FREE},
                {table_name: 'На улице', status: STATUS_FREE},
                {table_name: 'Зал №2', status: STATUS_FREE},
                {table_name: 'Семейный', status: STATUS_FREE},
                {table_name: 'На крыше', status: STATUS_FREE},
                {table_name: 'Зал №3', status: STATUS_FREE},
            ]

        await TableModel.bulkCreate(tables)
    }


}

module.exports = TablesSeeder