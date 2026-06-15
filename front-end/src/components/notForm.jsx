import { useState } from "react";
import { useNotContext } from "../hooks/useNotContext";
import { useAuthContext } from "../hooks/useAuthContext";

const NotForm = () => {
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [hata, setHata] = useState(null);
  const [bosAlanlar, setBosAlanlar] = useState([]);

  const { dispatch } = useNotContext();
  const { kullanici } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kullanici) {
      setHata("Giriş Yapmalısınız!!!");
      return;
    }

    const not = { baslik, aciklama };

    const response = await fetch("http://localhost:4000/api/notlar/", {
      method: "POST",
      body: JSON.stringify(not),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${kullanici.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      // <-- BURASI DÜZELTİLDİ: Büyük A harfi ile setBosAlanlar çağrıldı ve çift if temizlendi
      setHata(json.hata);
      setBosAlanlar(json.bosAlanlar || []);
    }

    if (response.ok) {
      setHata(null);
      setBaslik("");
      setAciklama("");
      setBosAlanlar([]);
      dispatch({ type: "NOT_OLUSTUR", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Yeni Bir Not Ekle</h3>
      <div className="create-group">
        <div>
          <label>Not Başlık:</label>
          <input
            type="text"
            className={bosAlanlar.includes("baslik") ? "error" : ""}
            onChange={(e) => setBaslik(e.target.value)}
            value={baslik}
          />
        </div>
        <div>
          <label>Not Açıklama:</label>
          <input
            type="text"
            className={bosAlanlar.includes("aciklama") ? "error" : ""}
            onChange={(e) => setAciklama(e.target.value)}
            value={aciklama}
          />
        </div>
      </div>
      <button type="submit">Ekle</button>

      {hata && <div className="error">{hata}</div>}
    </form>
  );
};

export default NotForm;
