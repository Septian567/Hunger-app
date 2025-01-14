export function generateRestaurantListHTML(
  restaurants,
  isFavoritePage = false
) {
  const initialRestaurants = restaurants.slice(0, 4);
  const remainingRestaurants = restaurants.slice(4);

  const initialHTML = initialRestaurants
    .map(
      (restaurant) => `
        <div class='restaurant-item' data-id='${restaurant.id}'>
          <div class='restaurant-image-container'>
            <img src='${restaurant.pictureId}' alt='${restaurant.altText}' class='restaurant-image' loading='lazy' />
            <span class='restaurant-city'>${restaurant.city}</span>
          </div>
          <div class='restaurant-info'>
            <h3 class='restaurant-name'><a href="#/detail/${restaurant.id}" class="restaurant-item-link">${restaurant.name}</a></h3>
            ${
  isFavoritePage
    ? `
                <div class='restaurant-rating'>
                  <span>Rating: ${restaurant.rating}</span>
                </div>
                <button class='remove-favorite' data-id='${restaurant.id}'>Remove from Favorites</button>
              `
    : ''
}
          </div>
        </div>
      `
    )
    .join('');

  const lazyHTML = remainingRestaurants
    .map(
      (restaurant) => `
        <div class='restaurant-item' data-id='${restaurant.id}'>
          <div class='restaurant-image-container'>
            <img data-src='${restaurant.pictureId}' alt='${restaurant.altText}' class='restaurant-image lazyload' />
            <span class='restaurant-city'>${restaurant.city}</span>
          </div>
          <div class='restaurant-info'>
            <h3 class='restaurant-name'><a href="#/detail/${restaurant.id}" class="restaurant-item-link">${restaurant.name}</a></h3>
            ${
  isFavoritePage
    ? `
                <div class='restaurant-rating'>
                  <span>Rating: ${restaurant.rating}</span>
                </div>
                <button class='remove-favorite' data-id='${restaurant.id}'>Remove from Favorites</button>
              `
    : ''
}
          </div>
        </div>
      `
    )
    .join('');

  return initialHTML + lazyHTML;
}
