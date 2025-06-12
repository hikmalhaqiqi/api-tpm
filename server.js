import express from 'express';
import cors from 'cors';
import db_barang from './config/database_barang.js';
import Barang from './models/barangModel.js';
import routerBarang from './routes/barangRoute.js';

const app = express();


console.log("🚀 Starting server setup...");

try {
    console.log("🔄 Connecting to Database Barang..");
    await db_barang.authenticate();
    console.log("✅ Database Data Barang Connected");
    await Barang.sync({ alter: true });
    console.log("✅ UserAdmin table synced");
} catch (error) {
    console.error("❌ Failed to connect to database:", error);
}


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(routerBarang);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running at port  ${PORT}`);
});