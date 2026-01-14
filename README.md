# Sağlık Rehberi KDS (Karar Destek Sistemi)

Bu proje, hastane yöneticileri için geliştirilmiş; doktor performanslarını, departman verimliliğini ve potansiyel gelir kayıplarını analiz eden web tabanlı bir **Karar Destek Sistemidir (KDS)**. 

Proje, **MVC (Model-View-Controller)** mimarisine uygun olarak geliştirilmiş ve **RESTful API** prensipleriyle desteklenmiştir.

## 🚀 Öne Çıkan Özellikler

* **Dashboard & Veri Görselleştirme:** Anlık gelir, muayene sayıları ve departman verilerinin Google Charts ile görselleştirilmesi.
* **Tam CRUD Yönetimi (Doktor Paneli):**
    * **Create:** Veritabanına yeni doktor ekleme.
    * **Read:** Mevcut doktorları, departman ve cinsiyet detaylarıyla listeleme.
    * **Update:** Mevcut doktor bilgilerini (ad, soyad, departman, cinsiyet) dinamik formlar üzerinden güncelleme.
    * **Delete:** Doktor kaydını sistemden güvenli bir şekilde silme.
* **Gelir Simülasyonu:** Yeni bir departman açılması durumunda tahmini gelirin simüle edilmesi.
* **Kayıp Kazanç Analizi:** Departman eksikliği nedeniyle kaybedilen hasta ve gelirlerin analizi.

## 🧠 Uygulanan İş Kuralları (Business Logic)

Proje kapsamında veri bütünlüğünü ve mantıksal tutarlılığı sağlamak için **3 temel iş kuralı** kodlanmıştır:

1.  **Simülasyon Kısıtlaması:** Yöneticiler simülasyon yaparken negatif ücret veya piyasa normlarının üzerinde (aşırı yüksek) muayene ücreti giremez.
2.  **Veri Bütünlüğü Koruması (Delete Restriction):** Sistemde **aktif veya geçmiş muayene kaydı bulunan bir doktor silinemez.** Bu işlem yapılmak istendiğinde sistem veritabanı tutarlılığını korumak için işlemi reddeder ve kullanıcıya uyarı verir.
3.  **Dinamik Referanslama:** Güncelleme ve ekleme işlemlerinde cinsiyet ve departman bilgileri doğrudan veritabanındaki tanımlı tablolardan (`gender`, `department`) çekilerek veri hatası oluşması engellenir.

## 🛠 Kullanılan Teknolojiler

* **Backend:** Node.js, Express.js
* **Veritabanı:** MySQL
* **Frontend:** EJS (Embedded JavaScript), Bootstrap 4, Google Charts
* **Mimari:** MVC (Model-View-Controller)

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **NodeJS Kurulumu:**
    Eğer bilgisayarınızda Node.js yüklü değilse [nodejs.org](https://nodejs.org/) adresinden **LTS** sürümünü indirin ve kurun.
2.  **Gerekli Paketleri Yükleyin:**
    Terminali açın ve proje ana dizininde aşağıdaki komutu çalıştırın:
    ```bash
    npm install 
    ```
3.  **Veritabanını Oluşturun:**
    * MySQL sunucunuzda **`db_healthguide2`** adında bir veritabanı oluşturun.
    * Ana dizindeki **`db_healthguide2.sql`** dosyasını bu veritabanına aktarın.
4.  **Projeyi Başlatın:**
    ```bash
    npm start  
    ```
    Tarayıcıda `http://localhost:3000` adresine gidin.

---

## 📡 API ve Sayfa Rotaları

### 1. Web Arayüzü (Sayfalar)
| Metot | Rota | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/` | Ana Dashboard ve Grafikler |
| `GET` | `/doctors` | **Doktor Yönetim Paneli (Read)** |
| `POST` | `/doctors/add` | **Yeni Doktor Ekleme (Create)** |
| `GET` | `/doctors/edit/:id` | **Doktor Düzenleme Sayfası (Update - UI)** |
| `POST` | `/doctors/update` | **Veritabanı Güncelleme İşlemi (Update - Process)** |
| `GET` | `/doctors/delete/:id` | **Doktor Silme İşlemi (Delete)** |
| `GET` | `/cost` | Kayıp Kazanç Analiz Sayfası |

### 2. JSON API (Veri Servisleri)
| Metot | Rota | Açıklama |
| :--- | :--- | :--- |
| `POST` | `/api/analysis/simulate-revenue` | Gelir simülasyonu verilerini döner. |
| `GET` | `/api/monthly_examination...` | Grafik verileri için aylık istatistikleri döner. |
| `GET` | `/api/sick_by_gender` | Cinsiyet dağılım verilerini döner. |

---

