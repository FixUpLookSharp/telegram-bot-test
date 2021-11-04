import { Table, STATUS_FREE, STATUS_BUSY } from '../Models/Table'

export default class TablesSeeder {
    async seed () {
        const tables =
            [
                { table_name: 'У окна', status: STATUS_FREE },
                { table_name: 'На веранде', status: STATUS_FREE },
                { table_name: 'Зал №1', status: STATUS_FREE },
                { table_name: 'Вип комната', status: STATUS_FREE },
                { table_name: 'На улице', status: STATUS_FREE },
                { table_name: 'Зал №2', status: STATUS_FREE },
                { table_name: 'Семейный', status: STATUS_FREE },
                { table_name: 'На крыше', status: STATUS_FREE },
                { table_name: 'Зал №3', status: STATUS_FREE }
            ]

        await Table.bulkCreate(tables)
    }
}
