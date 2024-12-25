import CONFIG from "../../globals/config";
import FavRestoIdb from "../../data/resto-idb";

const detailPage = {
  async render() {
    return `
      <div id="restaurant-detail" class="restaurant-detail"></div>
    `;
  },

  async afterRender() {
    const url = window.location.hash.slice(1).toLowerCase();
    const id = url.split("/")[2]; // Mendapatkan id dari URL
    const restaurantDetailElement =
      document.getElementById("restaurant-detail");

    try {
      const response = await fetch(`${CONFIG.BASE_URL}detail/${id}`);
      const data = await response.json();

      if (data.error) {
        restaurantDetailElement.innerHTML = `<p>Error fetching restaurant data.</p>`;
        return;
      }

      const restaurant = data.restaurant;
      restaurantDetailElement.innerHTML =
        this.generateRestaurantDetailHTML(restaurant);

      // Cek status favorit restoran dan atur tombolnya
      this.checkIfFavorite(id);

      // Event listener untuk tombol favorit
      this.setupFavoriteButton(restaurant);

      // Add event listeners for toggle buttons
      this.setupToggleMenuAndReviews();
    } catch (error) {
      restaurantDetailElement.innerHTML = `<p>Error fetching restaurant data: ${error.message}</p>`;
    }
  },

  generateRestaurantDetailHTML(restaurant) {
    return `
      <div class="restaurant-detail-header">
        <img src="${CONFIG.BASE_IMAGE_URL_LG}${restaurant.pictureId}" alt="${
      restaurant.name
    }" class="restaurant-detail-image" />
        <div class="restaurant-basic-info">
          <h3 class="restaurant-name">${restaurant.name}</h3>
          <p class="restaurant-address">${restaurant.city} - ${
      restaurant.address
    }</p>
          <p class="restaurant-rating">⭐ ${restaurant.rating}</p>
        </div>
        <button id="favorite-button" class="favorite-button">Add to Favorite</button>
      </div>
      <div id="description-section" class="restaurant-description">
        <p>${restaurant.description}</p>
      </div>
      <div class="restaurant-categories">
        <h4>Categories:</h4>
        <ul>
          ${restaurant.categories
            .map((category) => `<li>${category.name}</li>`)
            .join("")}
        </ul>
      </div>
      <button id="toggle-menu" class="toggle-button" aria-expanded="false" tabindex="0">Show Menus</button>
      <div id="menu-section" class="restaurant-menus" style="display:none;">
        <h4>Menus:</h4>
        <div class="restaurant-menu-section">
          <h5>Foods:</h5>
          <ul>
            ${restaurant.menus.foods
              .map((food) => `<li>${food.name}</li>`)
              .join("")}
          </ul>
        </div>
        <div class="restaurant-menu-section">
          <h5>Drinks:</h5>
          <ul>
            ${restaurant.menus.drinks
              .map((drink) => `<li>${drink.name}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
      <button id="toggle-reviews" class="toggle-button" aria-expanded="false" tabindex="0">Show Reviews</button>
      <div id="reviews-section" class="restaurant-reviews" style="display:none;">
        <h4>Customer Reviews:</h4>
        <ul>
          ${restaurant.customerReviews
            .map(
              (review) => `
            <li>
              <p><strong>${review.name}</strong> (${review.date}):</p>
              <p>${review.review}</p>
            </li>`
            )
            .join("")}
        </ul>
      </div>
    `;
  },

  // Mengecek apakah restoran sudah ada di favorit atau belum
  async checkIfFavorite(id) {
    const favorite = await FavRestoIdb.getResto(id);
    const favoriteButton = document.getElementById("favorite-button");

    // Mengubah teks tombol berdasarkan status favorit
    if (favorite) {
      favoriteButton.textContent = "Remove from Favorite";
      favoriteButton.classList.add("remove");
    } else {
      favoriteButton.textContent = "Add to Favorite";
      favoriteButton.classList.remove("remove");
    }
  },

  // Menangani event tombol favorit untuk menambah atau menghapus dari favorit
  setupFavoriteButton(restaurant) {
    const favoriteButton = document.getElementById("favorite-button");

    favoriteButton.addEventListener("click", async () => {
      const favorite = await FavRestoIdb.getResto(restaurant.id);

      if (favorite) {
        // Hapus restoran dari favorit
        await FavRestoIdb.deleteResto(restaurant.id);
        favoriteButton.textContent = "Add to Favorite";
        favoriteButton.classList.remove("remove");
      } else {
        // Tambahkan restoran ke favorit
        await FavRestoIdb.putResto(restaurant);
        favoriteButton.textContent = "Remove from Favorite";
        favoriteButton.classList.add("remove");
      }
    });
  },

  // Menambahkan fungsionalitas untuk menampilkan atau menyembunyikan menu dan review
  setupToggleMenuAndReviews() {
    const toggleMenuButton = document.getElementById("toggle-menu");
    const toggleReviewsButton = document.getElementById("toggle-reviews");
    const menuSection = document.getElementById("menu-section");
    const reviewsSection = document.getElementById("reviews-section");
    const descriptionSection = document.getElementById("description-section");

    // Set default state: Deskripsi dan Reviews terbuka
    descriptionSection.style.display = "block";
    reviewsSection.style.display = "block";
    toggleReviewsButton.textContent = "Hide Reviews"; // default button text
    toggleMenuButton.textContent = "Show Menus"; // default button text
    toggleReviewsButton.setAttribute("aria-expanded", "true");
    toggleMenuButton.setAttribute("aria-expanded", "true");

    // Toggle visibility of menu section
    toggleMenuButton.addEventListener("click", () => {
      if (
        menuSection.style.display === "none" ||
        menuSection.style.display === ""
      ) {
        menuSection.style.display = "block";
        toggleMenuButton.textContent = "Show Menus";
        toggleMenuButton.setAttribute("aria-expanded", "true");
      } else {
        menuSection.style.display = "none";
        toggleMenuButton.textContent = "Hide Menus";
        toggleMenuButton.setAttribute("aria-expanded", "false");
      }
    });

    // Toggle visibility of reviews section
    toggleReviewsButton.addEventListener("click", () => {
      if (reviewsSection.style.display === "none") {
        reviewsSection.style.display = "block";
        toggleReviewsButton.textContent = "Hide Reviews";
        toggleReviewsButton.setAttribute("aria-expanded", "true");
      } else {
        reviewsSection.style.display = "none";
        toggleReviewsButton.textContent = "Show Reviews";
        toggleReviewsButton.setAttribute("aria-expanded", "false");
      }
    });

    // Toggle visibility of description section (now visible by default)
    const toggleDescriptionButton = document.createElement("button");
    toggleDescriptionButton.classList.add("toggle-button");
    toggleDescriptionButton.textContent = "Hide Description";
    toggleDescriptionButton.setAttribute("aria-expanded", "true");
    toggleDescriptionButton.setAttribute("tabindex", "0");
    descriptionSection.before(toggleDescriptionButton);

    toggleDescriptionButton.addEventListener("click", () => {
      if (descriptionSection.style.display === "none") {
        descriptionSection.style.display = "block";
        toggleDescriptionButton.textContent = "Hide Description";
        toggleDescriptionButton.setAttribute("aria-expanded", "true");
      } else {
        descriptionSection.style.display = "none";
        toggleDescriptionButton.textContent = "Show Description";
        toggleDescriptionButton.setAttribute("aria-expanded", "false");
      }
    });
  },
};

export default detailPage;
