import { Sequelize } from 'sequelize';

const db_barang = new Sequelize('barang_database', 'root', 'f-02tccprakez', {
    host: '104.155.153.160',
    dialect: 'mysql',
});

export default db_barang;