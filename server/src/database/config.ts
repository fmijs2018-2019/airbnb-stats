import Sequelize from 'sequelize';

const database = process.env.DBNAME as string;
const username = process.env.DBUSER as string;
const password = process.env.DBPASS as string;
const hostname = process.env.DBHOSTNAME as string;

export const sequelize = new Sequelize(database, username, password, {
    dialect: 'postgres',
    host: hostname,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
