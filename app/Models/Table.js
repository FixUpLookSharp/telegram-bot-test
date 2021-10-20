const sequelize = require('../../db')
const {DataTypes} = require('sequelize')
const User = require('./User')

const Table = sequelize.define('table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unicode: true, autoIncrement: true},
    status: {type: DataTypes.STRING},
    table_name: {type: DataTypes.STRING},
    booking_time_before: {type: DataTypes.DATE, defaultValue: null},
})

module.exports = Table