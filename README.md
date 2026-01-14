# Sağlık Rehberi KDS (Karar Destek Sistemi)

Bu proje, hastane yöneticileri için geliştirilmiş; doktor performanslarını, departman verimliliğini ve potansiyel gelir kayıplarını analiz eden web tabanlı bir **Karar Destek Sistemidir (KDS)**.

Proje, **MVC (Model-View-Controller)** mimarisine uygun olarak geliştirilmiş ve **RESTful API** prensipleriyle desteklenmiştir.

## 🚀 Öne Çıkan Özellikler

* **Dashboard & Veri Görselleştirme:** Anlık gelir, muayene sayıları ve departman verilerinin Google Charts ile görselleştirilmesi.
* **Tam CRUD Yönetimi (Doktor Paneli):**
    * Veritabanına yeni doktor ekleme (Create).
    * Mevcut doktorları ve detaylarını listeleme (Read).
    * Doktor kaydını sistemden silme (Delete).
* **Gelir Simülasyonu:** Yeni bir departman açılması durumunda tahmini gelirin simüle edilmesi.
* **Kayıp Kazanç Analizi:** Departman eksikliği nedeniyle kaybedilen hasta ve gelirlerin analizi.

## 🧠 Uygulanan İş Kuralları (Business Logic)

Proje kapsamında gerçek hayat senaryolarına uygun **2 temel iş kuralı** kodlanmıştır:

1.  **Simülasyon Kısıtlaması:** Yöneticiler simülasyon yaparken negatif ücret veya piyasa normlarının üzerinde (aşırı yüksek) muayene ücreti giremez.
2.  **Veri Bütünlüğü Koruması (Delete Restriction):** Sistemde **aktif veya geçmiş muayene kaydı bulunan bir doktor silinemez.** Bu işlem yapıldığında sistem veritabanı tutarlılığını korumak için işlemi reddeder ve kullanıcıya uyarı verir.

## 🛠 Kullanılan Teknolojiler

* **Backend:** Node.js, Express.js
* **Veritabanı:** MySQL
* **Frontend:** EJS, Bootstrap, Google Charts
* **Mimari:** MVC (Model-View-Controller)

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Gerekli paketleri yükleyin:**
    *(Not: Proje dosya boyutunu düşük tutmak için `node_modules` klasörü hariç yüklenmiştir. İlk çalıştırmada aşağıdaki komut zorunludur.)*
    ```bash
    npm install
    ```

2.  **Veritabanını Oluşturun (ÖNEMLİ):**
    * Yerel MySQL sunucunuzda **`db_healthguide2`** adında boş bir veritabanı oluşturun.
    * Proje ana dizininde bulunan **`db_healthguide2.sql`** dosyasını bu veritabanına **içe aktarın (import)**.

3.  **Çevresel değişkenleri ayarlayın:**
    * `.env.example` dosyasının adını `.env` olarak değiştirin.
    * İçerisindeki veritabanı bilgilerini (kullanıcı adı, şifre vb.) kendi yerel ayarlarınıza göre doldurun.

4.  **Projeyi başlatın:**
    ```bash
    npm start
    ```
    Tarayıcıda `http://localhost:3000` adresine gidin.

## 📡 API ve Sayfa Rotaları

Proje içerisindeki temel uç noktalar (endpoints) şunlardır:

### 1. Web Arayüzü (Sayfalar)
| Metot | Rota | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/` | Ana Dashboard ve Grafikler |
| `GET` | `/doctors` | **Doktor Yönetim Paneli (CRUD Listeleme)** |
| `POST` | `/doctors/add` | **Yeni Doktor Ekleme İşlemi (Create)** |
| `GET` | `/doctors/delete/:id` | **Doktor Silme İşlemi (Delete)** |
| `GET` | `/cost` | Kayıp Kazanç Analiz Sayfası |

### 2. JSON API (Veri Servisleri)
| Metot | Rota | Açıklama |
| :--- | :--- | :--- |
| `POST` | `/api/analysis/simulate-revenue` | Gelir simülasyonu yapar (JSON döner). |
| `GET` | `/api/monthly_examination...` | Aylık muayene istatistiklerini getirir. |
| `GET` | `/api/sick_by_gender` | Cinsiyete göre hasta dağılımını getirir. |