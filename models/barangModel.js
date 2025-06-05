import { DataTypes } from 'sequelize';
import db_barang from '../config/database_barang.js';

const Barang = db_barang.define('Barang', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kategori: {
    type: DataTypes.ENUM('atasan', 'bawahan', 'sepatu', 'outerwear', 'aksesori'),
    allowNull: false
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  foto: {
    type: DataTypes.STRING, // URL atau path ke gambar
    //allowNull: false
  },
  ukuran: {
    type: DataTypes.ENUM('S', 'M', 'L', 'XL'),
    allowNull: false
  },
  jenis_kelamin: {
    type: DataTypes.ENUM('pria', 'wanita'),
    allowNull: false
  },
  merk: {
    type: DataTypes.STRING,
    allowNull: true
  },
  kondisi: {
    type: DataTypes.ENUM('Excellent Condition', 'Good Condition', 'Fair Condition'),
    allowNull: false
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'barang',
  timestamps: true
});

export default Barang;