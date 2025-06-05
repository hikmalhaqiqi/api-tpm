import { Sequelize } from 'sequelize';

const db_barang = new Sequelize('RECOVER_YOUR_DATA', 'root', '', {
    host: '35.222.102.25',
    dialect: 'mysql',
});

export default db_barang;