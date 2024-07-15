// Yeni bir görev eklemek için kullanılan fonksiyon
function newElement() {
    let task = document.getElementById("task"); // Görev metnini al
    if (task.value.trim() !== "") { // Görev metni boş değilse...
        createElement(task.value.trim()); // Yeni bir öğe oluştur
        setLocalStorage(); // Yerel depolamayı güncelle
        task.value = ""; // Giriş alanını temizle
        $(".success").toast('show'); // Başarı mesajını göster
    } else {
        $(".error").toast('show'); // Hata mesajını göster
    }
}

// Yeni bir liste öğesi oluşturmak için kullanılan fonksiyon
function createElement(value) {
    let liDOM = document.createElement("li"); // Yeni bir <li> öğesi oluştur
    liDOM.innerHTML = `
        ${value}
        <span class="closes" onclick="deleteElement(this)">&times;</span>
    `; // Görev metni ve kapatma butonu ekle
    liDOM.setAttribute("onclick", "completeElement(this)"); // Görevi tamamlanmış olarak işaretlemek için tıklama olayı
    document.getElementById("list").appendChild(liDOM); // Listeye yeni öğeyi ekle
}

// Görevi tamamlanmış olarak işaretlemek için kullanılan fonksiyon
function completeElement(item) {
    item.classList.toggle("checked"); // Öğeye 'checked' sınıfını ekle veya kaldır
}

// Liste öğesini silmek için kullanılan fonksiyon
function deleteElement(item) {
    item.parentElement.remove(); // Öğeyi listeden kaldır
    setLocalStorage(); // Yerel depolamayı güncelle
}

// Yerel depolamayı güncellemek için kullanılan fonksiyon
function setLocalStorage() {
    let tasks = Array.from(document.getElementById("list").children).map(item => item.firstChild.textContent.trim()); // Listedeki görevleri al ve diziye dönüştür
    localStorage.setItem("localLi", JSON.stringify(tasks)); // Görevleri JSON formatında yerel depolamaya kaydet
}

// Sayfa yüklendiğinde yerel depolamadan görevleri almak için kullanılan fonksiyon
function getLocalStorage() {
    let storedTasks = JSON.parse(localStorage.getItem("localLi")) || []; // Yerel depolamadan görevleri al, eğer yoksa boş dizi oluştur
    storedTasks.forEach(value => createElement(value)); // Her görev için yeni bir liste öğesi oluştur
}

// Sayfa yüklendiğinde yerel depolamadan görevleri yükle
getLocalStorage();
