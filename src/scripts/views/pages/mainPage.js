import CONFIG from "../../globals/config";

const mainPage = {
  async render() {
    return `
      <h2>Main Page</h2>
      <div id="restaurant-list" class="restaurant-list"></div>
    `;
  },

  async afterRender() {
    const restaurantListElement = document.getElementById("restaurant-list");

    try {
      const response = await fetch(`${CONFIG.BASE_URL}list`);
      const data = await response.json();

      const restaurants = data.restaurants.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: `${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}`,
        city: restaurant.city,
        rating: restaurant.rating,
        altText: `Image of ${restaurant.name} restaurant`,
      }));

      if (restaurants.length > 0) {
        restaurantListElement.innerHTML =
          this.generateRestaurantListHTML(restaurants);
        this.addEventListeners();
      } else {
        restaurantListElement.innerHTML = "<p>No restaurants available.</p>";
      }
    } catch (error) {
      restaurantListElement.innerHTML = `<p>Error fetching restaurant data: ${error.message}</p>`;
    }
  },

  generateRestaurantListHTML(restaurants) {
    return restaurants
      .map(
        (restaurant) => `
          <div class="restaurant-item" data-id="${restaurant.id}" tabindex="0">
            <div class="restaurant-image-container">
              <img src="${restaurant.pictureId}" alt="${
          restaurant.altText
        }" class="restaurant-image" />
              <span class="restaurant-city">${restaurant.city}</span>
            </div>
            <div class="restaurant-info">
              <h3 class="restaurant-name">${restaurant.name}</h3>
              <p class="restaurant-description-card">${restaurant.description.slice(
                0,
                50
              )}...</p>
              <div class="rating-icon">⭐ ${restaurant.rating}</div>
            </div>
          </div>
        `
      )
      .join("");
  },

  addEventListeners() {
    const restaurantItems = document.querySelectorAll(".restaurant-item");

    restaurantItems.forEach((item) => {
      // Klik pada elemen utama kartu restoran
      item.addEventListener("click", (event) => {
        const restaurantId = item.getAttribute("data-id");
        window.location.href = `#/detail/${restaurantId}`;
      });

      // Navigasi keyboard
      item.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault(); // Cegah scroll default
          const nextItem =
            event.key === "ArrowDown"
              ? item.nextElementSibling
              : item.previousElementSibling;

          if (nextItem && nextItem.classList.contains("restaurant-item")) {
            nextItem.focus();
          }
        } else if (
          (event.key === "Enter" || event.key === " ") &&
          document.activeElement === item
        ) {
          const restaurantId = item.getAttribute("data-id");
          window.location.href = `#/detail/${restaurantId}`;
        }
      });
    });
  },
};

export default mainPage;
