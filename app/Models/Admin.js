import { sequelize } from '../../config/db'
import pkg from 'sequelize'
const { DataTypes } = pkg

export const Admin = sequelize.define('admin', {
    id: { type: DataTypes.INTEGER, primaryKey: true, unicode: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
})

export default Admin
