const express = require("express");
const NotModel = require("../models/notModels");
const {
  notOlustur,
  notlarGetir,
  notGetir,
  notSil,
  notGuncelle,
} = require("../controllers/notController");
const authKontrol = require("../middlewares/authKontrol");

const router = express.Router();

router.use(authKontrol);

//tüm notları getir
router.get("/", notlarGetir);

//listele
router.get("/:id", notGetir);

//ekle
router.post("/", notOlustur);

//sil
router.delete("/:id", notSil);

//güncelle
router.patch("/:id", notGuncelle);

module.exports = router;
