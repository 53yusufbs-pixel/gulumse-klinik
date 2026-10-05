// ===== ÇALIŞMA SAATLERİ İLE İLGİLİ HESAPLAR =====
// Bu dosya ayrı bir "parça" (modül). main.js bunu içe aktarıp (import) kullanıyor.
// Kaynak kodda ayrı dosya olması düzenli çalışmak için; build sonrası main.js ile birleşecek.

// Bir satırı okunaklı metne çevir: "Cumartesi: 10:00 – 14:00"
export function saatMetni(satir) {
  if (satir.acilis === null) {
    return satir.etiket + ": Kapalı";
  }
  return satir.etiket + ": " + satir.acilis + ":00 – " + satir.kapanis + ":00";
}

// Verilen zamanda klinik açık mı?
export function acikMi(saatler, zaman) {
  const gun = zaman.getDay();      // 0 = Pazar ... 6 = Cumartesi
  const saat = zaman.getHours();

  return saatler.some(function (satir) {
    return satir.gunler.includes(gun)
      && satir.acilis !== null
      && saat >= satir.acilis
      && saat < satir.kapanis;
  });
}
