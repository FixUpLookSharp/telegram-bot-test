import {sequelize} from '../../db'
import pkg from 'sequelize';
const {DataTypes} = pkg;

export const STATUS_FREE = 'свободно'
export const STATUS_BUSY = 'занят'

export const Table = sequelize.define('table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unicode: true, autoIncrement: true},
    status: {type: DataTypes.ENUM(STATUS_FREE, STATUS_BUSY)},
    table_name: {type: DataTypes.STRING},
    booking_time_before: {type: 'TIMESTAMP', defaultValue: null},
})

