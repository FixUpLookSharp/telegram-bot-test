const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

const Table = sequelize.define('table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unicode: true, autoIncrement: true},
    status: {type: DataTypes.STRING},
    booking_time_before: {type: DataTypes.TIME, defaultValue: null},
})

module.exports = Table