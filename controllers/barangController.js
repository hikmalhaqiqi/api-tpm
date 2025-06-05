import Barang from "../models/barangModel.js";
import multer from "multer";
import { uploadImageToGCS } from "../uploads/storage.js";
//import publicUrl from "../uploads/storage.js"

const storage = multer.memoryStorage();
export const upload = multer({ storage }); // middleware

export const getBarang = async (req, res) => {
  try {
    const response = await Barang.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error); // Cetak error ke konsol untuk debugging
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan pada server atau database kosong" });
  }
};

export const getBarangById = async (req, res) => {
  try {
    const response = await Barang.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!response) {
      return res.status(404).json({ msg: "Data barang tidak ditemukan" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat mengambil data barang" });
  }
};

export const AddBarang = async (req, res) => {
  try {
    let imageUrl = null;
    console.log("udah berhasil di let image");
    if (req.file) {
      console.log("gambarnya udah ada");
      try {
        imageUrl = await uploadImageToGCS(req.file);
        console.log("url imgage di controller:", imageUrl);
      } catch (err) {
        console.error("❌ Error saat upload gambar:", err);
        return res.status(500).json({ msg: "Gagal upload gambar", error: err });
      }
    }

    const newBarang = await Barang.create({
      ...req.body,
      foto: imageUrl,
    });

    res
      .status(201)
      .json({ msg: "Data Barang berhasil ditambahkan", data: newBarang });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: "Gagal menambahkan data", error: error.message });
  }
};

export const updateBarang = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Barang.update(req.body, {
      where: { id: id },
    });

    if (updated === 0) {
      return res.status(404).json({ msg: "Barang tidak ditemukan atau tidak ada perubahan" });
    }

    res.status(200).json({ msg: "Data barang telah diubah" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: "Gagal mengubah data barang", error: error.message });
  }
};


export const deleteBarang = async (req, res) => {
  try {
    const deleted = await Barang.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deleted === 0) {
      return res.status(404).json({ msg: "Data barang tidak ditemukan" });
    }

    res.status(200).json({ msg: "Data barang telah dihapus" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: "Gagal menghapus data barang", error: error.message });
  }
};
