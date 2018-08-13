const Sequelize =  require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    port: '8081',
    authentication: {
        jwsSecret: process.env.JSW_SECRET || 'secret'
    },
    db: {
        local: {
            username: 'root',
            password: 'zqxwce12',
            database: 'development',
            options: {
                host: '127.0.0.1',
                dialect: 'mysql',
                operatorsAliases: false
            }
        },
        development: {
            username: 'root',
            password: 'zqxwce12',
            database: 'development',
            options: {
                host: '127.0.0.1',
                dialect: 'mysql',
                operatorsAliases: false
            }
        },
        test: {
            username: 'root',
            password: 'zqxwce12',
            database: 'development',
            options: {
                host: '127.0.0.1',
                dialect: 'mysql',
                operatorsAliases: false
            }
        },
        production: {
            username: 'root',
            password: 'zqxwce12',
            database: 'development',
            options: {
                host: '127.0.0.1',
                dialect: 'mysql',
                operatorsAliases: false
            }
        }
    }
};
