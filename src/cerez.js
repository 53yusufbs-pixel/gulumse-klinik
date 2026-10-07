// ===== ÇEREZ ONAYI + GOOGLE ANALYTICS YÜKLEME (Aşama 6) =====
// Mantık:
//   1) Ziyaretçinin kararı tarayıcıda "cerez_onayi" adıyla saklanır: "kabul" / "red".
//   2) Karar yoksa → onay kutusunu göster, Analytics'i YÜKLEME.
//   3) "kabul" → Analytics'i yükle.   "red" → hiçbir şey yapma.
// Not: Kararı localStorage'da tutuyoruz (çerez değil). Bu bilgi Google'a gitmez,
//      sadece bu tarayıcıda "ne demişti?" diye hatırlamak için. Zorunlu (teknik) kayıttır.

const OLCUM_KIMLIGI = "G-B0J197TKK3";
const KAYIT_ADI = "cerez_onayi";

const kutu = document.getElementById("cerez-kutusu");

// Diğer dosyalar (main.js'teki tıklama ölçümü) "Analytics açık mı?" diye buna bakar
window.analyticsAcik = false;

// Analytics'i yükle: gtag.js'yi şimdi indir, Google'a "izin verildi" de
function analyticsYukle() {
  if (window.analyticsAcik) return; // iki kez yükleme
  window.analyticsAcik = true;

  gtag("consent", "update", { analytics_storage: "granted" });

  const betik = document.createElement("script");
  betik.async = true;
  betik.src = "https://www.googletagmanager.com/gtag/js?id=" + OLCUM_KIMLIGI;
  document.head.appendChild(betik);

  gtag("js", new Date());
  gtag("config", OLCUM_KIMLIGI);
}

// Daha önce kabul edip sonra reddederse: Analytics'in yazdığı _ga çerezlerini sil
function analyticsCerezleriniSil() {
  const alanAdi = location.hostname;                                  // klinik.mavr-ai.com
  const anaAlanAdi = "." + alanAdi.split(".").slice(-2).join(".");    // .mavr-ai.com
  document.cookie.split(";").forEach(function (parca) {
    const ad = parca.split("=")[0].trim();
    if (ad === "_ga" || ad.startsWith("_ga_")) {
      // Çerez hangi alan adına yazıldıysa o alan adıyla silinir; hepsini deniyoruz
      [alanAdi, "." + alanAdi, anaAlanAdi].forEach(function (alan) {
        document.cookie = ad + "=; Max-Age=0; path=/; domain=" + alan;
      });
      document.cookie = ad + "=; Max-Age=0; path=/";
    }
  });
}

function kararKaydet(karar) {
  try { localStorage.setItem(KAYIT_ADI, karar); } catch (e) { /* gizli pencere vb. */ }
  kutu.hidden = true;

  if (karar === "kabul") {
    analyticsYukle();
  } else if (window.analyticsAcik) {
    // Önce kabul etmişti, şimdi vazgeçti: Google'a "artık izin yok" de, çerezleri sil,
    // sayfayı yenile (yüklenmiş Analytics programı ancak böyle tamamen durur)
    gtag("consent", "update", { analytics_storage: "denied" });
    analyticsCerezleriniSil();
    location.reload();
  }
}

// Sayfa açılınca: daha önce ne demişti?
let oncekiKarar = null;
try { oncekiKarar = localStorage.getItem(KAYIT_ADI); } catch (e) {}

if (oncekiKarar === "kabul") {
  analyticsYukle();
} else if (oncekiKarar === null) {
  kutu.hidden = false; // hiç karar vermemiş → sor
}
// "red" ise: hiçbir şey yapma, kutuyu da gösterme

// Düğmeler
document.getElementById("cerez-kabul").addEventListener("click", function () { kararKaydet("kabul"); });
document.getElementById("cerez-reddet").addEventListener("click", function () { kararKaydet("red"); });
// Footer'daki "Çerez tercihleri": kutuyu yeniden aç (onayı geri alma hakkı)
document.getElementById("cerez-tercih").addEventListener("click", function () { kutu.hidden = false; });
