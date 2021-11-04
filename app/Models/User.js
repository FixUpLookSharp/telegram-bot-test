import { sequelize } from '../../config/db'
import pkg from 'sequelize'
import { Table } from './Table'
const { DataTypes } = pkg

export const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, unicode: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING },
    user_name: { type: DataTypes.STRING },
    chat_id: { type: DataTypes.STRING, unique: true }
})

User.hasOne(Table, { onDelete: 'cascade' })
Table.belongsTo(User)
