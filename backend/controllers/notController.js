const NotModel = require("../models/notModels");
const mongoose = require("mongoose");

// YENİ NOT OLUŞTUR
const notOlustur = async (req, res) => {
  const { baslik, aciklama } = req.body;

  let bosAlanlar = [];

  if (!baslik) {
    bosAlanlar.push("baslik");
  }
  if (!aciklama) {
    bosAlanlar.push("aciklama"); // <-- BURASI DÜZELTİLDİ ("baslik" yazıyordu)
  }

  if (bosAlanlar.length > 0) {
    return res.status(400).json({ hata: "Alanlar boş geçilemez", bosAlanlar });
  }

  try {
    const kullanici_id = req.kullanici._id; // authKontrol'den gelen id
    const not = await NotModel.create({ baslik, aciklama, kullanici_id });
    res.status(200).json(not);
  } catch (error) {
    res.status(400).json({ hata: error.message });
  }
};

// KULLANICIYA GÖRE TÜM NOTLARI GETİR
const notlarGetir = async (req, res) => {
  try {
    const kullanici_id = req.kullanici._id;

    const notlar = await NotModel.find({ kullanici_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(notlar);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

// TEK BİR NOT GETİR
const notGetir = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ hata: "ID Geçersiz" });
  }

  const not = await NotModel.findById(id);

  if (!not) {
    return res.status(404).json({ hata: "Not bulunamadı." });
  }

  res.status(200).json(not);
};

// NOT SİL
const notSil = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ hata: "ID Geçersiz" });
  }

  const not = await NotModel.findOneAndDelete({ _id: id });

  if (!not) {
    return res.status(404).json({ hata: "Not bulunamadı." });
  }

  res.status(200).json(not);
};

// NOT GÜNCELLE
const notGuncelle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ hata: "ID Geçersiz" });
  }

  const not = await NotModel.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true },
  );

  if (!not) {
    return res.status(404).json({ hata: "Not bulunamadı." });
  }

  res.status(200).json(not);
};

module.exports = {
  notOlustur,
  notlarGetir,
  notGetir,
  notSil,
  notGuncelle,
};
