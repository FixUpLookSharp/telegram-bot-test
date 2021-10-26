const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'homestead',
    'homestead',
    'secret',
    {
        host: '127.0.0.1',
        port: '5432',
        dialect: 'postgres',
        dialectOptions: {
            useUTC: true,
        },
        timezone: '+03:00',
    }
)