import CONFIG from "../../globals/config";
import FavRestoIdb from "../../data/resto-idb";

const favoritePage = {
  async render() {
    return `
      <h2>Favorite Restaurants Indexed Db</h2>
      <div id="favoriteContent">
        <div id="favorite-restaurants" class="restaurant-list"></div>
      </div>
    `;
  },

  async afterRender() {
    const favoriteRestaurantsContainer = document.getElementById(
      "favorite-restaurants"
    );

    try {
      const favoriteRestaurants = await FavRestoIdb.getAllResto();

      if (favoriteRestaurants.length === 0) {
        favoriteRestaurantsContainer.innerHTML =
          "<p>No favorite restaurants added yet.</p>";
        return;
      }

      favoriteRestaurantsContainer.innerHTML =
        this.generateRestaurantListHTML(favoriteRestaurants);
      this.addKeyboardNavigation();
      this.addClickListenersToRestaurants();
      this.setupRemoveFavoriteButtons();
    } catch (error) {
      favoriteRestaurantsContainer.innerHTML = `<p>Error fetching favorite restaurants: ${error.message}</p>`;
    }
  },

  generateRestaurantListHTML(restaurants) {
    return restaurants.map(this.generateRestaurantItemHTML).join("");
  },

  generateRestaurantItemHTML(restaurant) {
    const { id, pictureId, name, description, city, rating } = restaurant;

    return `
      <div class="restaurant-item" data-id="${id}" tabindex="0">
        <div class="restaurant-image-container">
          <img src="${
            CONFIG.BASE_IMAGE_URL
          }${pictureId}" alt="Image of ${name} restaurant" class="restaurant-image" />
          <span class="restaurant-city">${city}</span>
        </div>
        <div class="restaurant-info">
          <h3 class="restaurant-name">${name}</h3>
          <p class="restaurant-description-card">${description.slice(
            0,
            50
          )}...</p>
          
          <!-- Table untuk rating dan tombol hapus -->
          <div class="restaurant-actions">
            <div class="restaurant-rating">
              <span class="rating-icon">⭐</span> ${rating}
            </div>
            <button class="remove-favorite-button" data-id="${id}" aria-label="Remove from favorites">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `;
  },

  addKeyboardNavigation() {
    const restaurantItems = document.querySelectorAll(".restaurant-item");
    restaurantItems.forEach((item) => {
      item.addEventListener("keydown", (event) => {
        const removeButton = item.querySelector(".remove-favorite-button");

        switch (event.key) {
          case "Enter":
            if (document.activeElement === item) {
              const restaurantId = item.getAttribute("data-id");
              window.location.href = `#/detail/${restaurantId}`;
            }
            break;
          case "Delete":
            if (document.activeElement === removeButton) {
              removeButton.click();
            }
            break;
          case "ArrowDown":
            event.preventDefault();
            const nextSibling = item.nextElementSibling;
            if (nextSibling) {
              nextSibling.focus();
            }
            break;
          case "ArrowUp":
            event.preventDefault();
            const previousSibling = item.previousElementSibling;
            if (previousSibling) {
              previousSibling.focus();
            }
            break;
          default:
            break;
        }
      });
    });
  },

  addClickListenersToRestaurants() {
    const restaurantItems = document.querySelectorAll(".restaurant-item");
    restaurantItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        if (!event.target.classList.contains("remove-favorite-button")) {
          const restaurantId = item.getAttribute("data-id");
          window.location.href = `#/detail/${restaurantId}`;
        }
      });
    });
  },

  setupRemoveFavoriteButtons() {
    const removeFavoriteButtons = document.querySelectorAll(
      ".remove-favorite-button"
    );
    removeFavoriteButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.stopPropagation(); // Prevent triggering the item click listener
        const id = event.target.dataset.id;

        try {
          await FavRestoIdb.deleteResto(id);
          this.afterRender();
        } catch (error) {
          console.error("Failed to remove favorite restaurant:", error);
        }
      });
    });
  },
};

export default favoritePage;
