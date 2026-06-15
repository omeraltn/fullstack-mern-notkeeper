# Full-Stack JWT Kimlik Doğrulamalı Not Yönetimi Uygulaması

Bu proje, modern web geliştirme standartları kullanılarak geliştirilmiş, güvenli ve kullanıcı tabanlı bir **Not Yönetimi (Notes App)** uygulamasıdır. Proje, istemci ve sunucu tarafının ayrıldığı aygıtlar arası mimariye (Decoupled Architecture) uygun olarak tam yığın (Full-Stack) olarak tasarlanmıştır.

Uygulamanın temel amacı; **JWT (JSON Web Token)** tabanlı kimlik doğrulama mekanizmalarını, **React 19 (Context API + Reducer)** durum yönetimini ve **Node.js/Express + MongoDB** arka plan entegrasyonunu uçtan uca simüle ederek güvenli veri akışını sağlamaktır.

---

## 🚀 Öne Çıkan Teknik Özellikler ve Mimari

- **Güvenli Kimlik Doğrulama (Auth):** Kullanıcı şifreleri veritabanına kaydedilmeden önce `bcrypt` ile tuzlanarak (salting) hash'lenir. Giriş ve kayıt işlemlerinde üretilen `jsonwebtoken` (JWT), HTTP Authorization header (`Bearer <token>`) üzerinden taşınarak rota güvenliği (Route Protection) sağlar.
- **Merkezi Durum Yönetimi (State Management):** React tarafında global state yönetimi için Redux yükü oluşturmadan `Context API` ve `useReducer` mimarisi tercih edilmiştir. Kullanıcı oturum bilgileri (`authContext`) ve not verileri (`notContext`) asenkron fetch istekleriyle eşzamanlı (UI sync) olarak güncellenir.
- **Özel Hook (Custom Hooks) Tasarımı:** İş mantığı (Business Logic) ile arayüz bileşenlerini ayırmak amacıyla `useLogin`, `useSignUp`, `useLogout`, `useAuthContext` ve `useNotContext` gibi modüler hook'lar geliştirilmiştir.
- **Gelişmiş Form Validasyonu & Hata Yönetimi:** Backend ve frontend katmanlarında dinamik alan kontrolü yapılır. Boş bırakılan alanlar API'den dizi halinde dönülerek (`bosAlanlar`), ilgili input elemanlarına dinamik olarak hata sınıfları (`className="error"`) atanır.

---

## 🛠️ Kullanılan Teknolojiler

### Arka Plan (Backend)

- **Çalışma Ortamı:** Node.js, Express v5 (Modern asenkron rota yönetimi)
- **Veritabanı & ORM:** MongoDB, Mongoose v9 (Veri modelleme ve şema doğrulaması)
- **Güvenlik:** JSON Web Token (JWT), Bcrypt, CORS
- **Geliştirme Araçları:** Dotenv, Nodemon

### Ön Yüz (Frontend)

- **Ana Yapı:** React 19, Vite v8 (Hızlı modül paketleme ve geliştirme ortamı)
- **Yönlendirme:** React Router DOM v7 (Kullanıcı oturum durumuna göre dinamik yönlendirme / `Maps`)
- **Zaman Biçimlendirme:** Moment.js (Yerelleştirilmiş Türkçe zaman akışı: _"... dakika önce"_)

---

## 🗂️ Klasör Yapısı ve Veri Akışı

Uygulama, istek güvenliğini sağlamak için ara katman (Middleware) mimarisini kullanır:

1.  İstemci korumalı bir rotaya (`/api/notlar`) istek atar.
2.  `authKontrol` middleware'i gelen token'ı doğrular ve kullanıcının benzersiz ID'sini veritabanından çekerek `req.kullanici` nesnesine bağlar.
3.  İlgili controller (`notController`), yalnızca o kullanıcıya ait veriler üzerinde CRUD işlemlerini yürütür.

---

## ⚙️ Kurulum ve Çalıştırma

Proje iki ana dizinden oluşmaktadır: `backend` ve `front-end`.

### 1. Arka Planı Başlatın (Backend)

```bash
cd backend
npm install


## Ekran Görüntüsü
![](./public/screen.jpg)

## GIF
![](./public/ekran.gif)
```
