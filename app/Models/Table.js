const sequelize = require('../../db')
const {DataTypes} = require('sequelize')
const User = require('./User')

const STATUS_FREE = 'свободно'
const STATUS_BUSY = 'занят'

const Table = sequelize.define('table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unicode: true, autoIncrement: true},
    status: {type: DataTypes.ENUM(STATUS_FREE, STATUS_BUSY)},
    table_name: {type: DataTypes.STRING},
    booking_time_before: {type: 'TIMESTAMP', defaultValue: null},
})

module.exports = Table

exports = module.exports

exports.STATUS_FREE = STATUS_FREE;
exports.STATUS_BUSY = STATUS_BUSY;