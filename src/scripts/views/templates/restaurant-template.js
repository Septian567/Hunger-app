export function generateRestaurantListHTML(
  restaurants,
  isFavoritePage = false
) {
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
            ${
              isFavoritePage
                ? `
                <div class="restaurant-rating">
                  <span>Rating: ${restaurant.rating}</span>
                </div>
                <button class="remove-favorite" data-id="${restaurant.id}">Remove from Favorites</button>
                `
                : ""
            }
          </div>
        </div>
      `
    )
    .join("");
}
