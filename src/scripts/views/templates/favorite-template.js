import CONFIG from "../../globals/config";

const favoriteTemplate = {
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
          <div class="restaurant-actions">
            <div class="restaurant-rating">
              <span class="rating-icon">⭐</span> ${rating}
            </div>
            <button 
              class="remove-favorite-button" 
              data-id="${id}" 
              aria-label="Remove from favorites"
              title="Remove ${name} from favorites"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    `;
  },
};

export default favoriteTemplate;
