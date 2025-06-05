import express from 'express';
//import { upload } from "../controllers/barangController.js";
import { upload, getBarang, getBarangById, AddBarang, updateBarang, deleteBarang } from '../controllers/barangController.js';

const routerBarang = express.Router();

routerBarang.get('/Barang', getBarang);
routerBarang.get('/Barang/:id', getBarangById);
routerBarang.post("/add", upload.single("foto"), AddBarang);
//routerBarang.post('/add', AddBarang);
routerBarang.patch('/update/:id', updateBarang);
routerBarang.delete('/Barang/:id', deleteBarang);

export default routerBarang;