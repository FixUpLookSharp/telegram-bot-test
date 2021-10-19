const sequelize = require('../../db')
const {DataTypes} = require('sequelize')
const Table = require('./Table')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unicode: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING},
    user_name: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING, unique: true,},
})

User.hasOne(Table, { onDelete: "cascade"});

module.exports = User
