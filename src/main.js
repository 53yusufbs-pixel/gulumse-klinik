// ===== ANA JAVASCRIPT DOSYASI =====

// Başka dosyalardan parçaları içe aktar (import).
// 4. aşamada saatler.json'ı tarayıcı sayfa açıldıktan SONRA sunucudan istiyordu (fetch).
// Burada ise Vite, build sırasında JSON'un içeriğini doğrudan JavaScript dosyasının içine gömecek.
import saatler from "./saatler.json";
import { saatMetni, acikMi } from "./saatler.js";

const buton = document.getElementById("saat-butonu");
const liste = document.getElementById("saat-listesi");
const durumYazisi = document.getElementById("durum");

// Saat listesini doldur
saatler.forEach(function (satir) {
  const madde = document.createElement("li");
  madde.textContent = saatMetni(satir);
  liste.appendChild(madde);
});

// Açık / kapalı durumu (ziyaretçinin saatiyle — statik sitede sunucu yok!)
durumYazisi.textContent = acikMi(saatler, new Date())
  ? "🟢 Şu an açığız"
  : "🔴 Şu an kapalıyız";

// Aç / kapa butonu
buton.addEventListener("click", function () {
  liste.classList.toggle("gizli");
  buton.textContent = liste.classList.contains("gizli")
    ? "Çalışma saatlerini göster"
    : "Çalışma saatlerini gizle";
});
