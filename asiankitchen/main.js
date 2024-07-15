import { menu } from "./app.js"; // app.js dosyasındaki menü verilerini içeri aktar

const sectionCenter = document.querySelector(".section-center"); // Menü öğelerinin gösterileceği bölüm
const btnContainer = document.querySelector(".btn-container"); // Filtreleme butonlarının gösterileceği bölüm

// Sayfa yüklendiğinde menü öğelerini ve filtreleme butonlarınu göster
window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menu); // Menü öğelerini görüntüle
  displayMenuButtons(); // Filtreleme butonlarınu göster
});

function displayMenuItems(menuItems) {
  // Menü öğelerini map yöntemiyle HTML formatında string olarak oluştur
  let displayMenu = menuItems.map((item) => {
    return `
      <article class="menu-item row col-md-12 col-lg-6 mb-5">
          <img src="${item.img}" class="img-fluid photo" alt="${item.title}">
        <div class="col-md-8">
        <div class="menu-item-info">
            <header class="d-flex justify-content-between align-items-center">
          <h4>${item.title}</h4>
          <h4 class="price">$${item.price}</h4>
        </header>
        <hr />
        <p class="menu-text">${item.desc}</p>
        </div>
        </div>
      </article>
    `;
  });
  displayMenu = displayMenu.join(""); // Stringleri birleştir ve tek bir HTML string oluştur
  sectionCenter.innerHTML = displayMenu; // Menü öğelerini bölümün içine (sectionCenter'e) yerleştirir.
}

function displayMenuButtons() {
  // Kategorileri reduce yöntemiyle toplar, tekrar edenleri filtreler
  const categories = menu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category); // daha önce katagori eklenmemişse ekler
      }
      return values;
    },
    ["All"]
  ); // Başlangıçta tüm kagetoriler gösterilir.

  const categoryBtns = categories
    .map((category) => {
      return `<button id="filter-btn" class="btn btn-primary ms-2" data-category="${category}">
    ${category}
    </button>`; // Katagorileri butonlara dönüştür
    })
    .join(""); // Butonları birleştir.

  btnContainer.innerHTML = categoryBtns; // Filtreleme butonlarını bölümün içine yani (btnContainer'e) yerleştirir.
  const filterBtns = btnContainer.querySelectorAll("#filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.currentTarget.dataset.category; // Butona tıklandığında kategoriyi alır
      const menuCategory = menu.filter((menuItem) => {
        if (menuItem.category === category) {
          return menuItem; // Eğer menü seçilen kategoriye aitse döndür
        }
      });
      if (category === "All") {
        displayMenuItems(menu); // All kategorisi seçili ise tüm menüdeki öğeleri göster
      } else {
        displayMenuItems(menuCategory); // Değilse seçili kategorideki öğeleri göster
      }
    });
  });
}
