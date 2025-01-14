import CONFIG from '../../globals/config';

const generateRestaurantDetailHTML = (restaurant) => `
  <div class='restaurant-detail-header'>
    <img src='${CONFIG.BASE_IMAGE_URL_LG}${restaurant.pictureId}' alt='${
  restaurant.name
}' class='restaurant-detail-image' />
    <div class='restaurant-basic-info'>
      <h3 class='restaurant-name'>${restaurant.name}</h3>
      <p class='restaurant-address'>${restaurant.city} - ${
  restaurant.address
}</p>
      <p class='restaurant-rating'>⭐ ${restaurant.rating}</p>
    </div>
    <button id='favorite-button' class='favorite-button'>Add to Favorite</button>
  </div>
  <div id='description-section' class='restaurant-description'>
    <p>${restaurant.description}</p>
  </div>
  <div class='restaurant-categories'>
    <h4>Categories:</h4>
    <ul>
      ${restaurant.categories
    .map((category) => `<li>${category.name}</li>`)
    .join('')}
    </ul>
  </div>
  <button id='toggle-menu' class='toggle-button' aria-expanded='false' tabindex='0'>Show Menus</button>
  <div id='menu-section' class='restaurant-menus' style='display:none;'>
    <h4>Menus:</h4>
    <div class='restaurant-menu-section'>
      <h5>Foods:</h5>
      <ul>
        ${restaurant.menus.foods
    .map((food) => `<li tabindex='0'>${food.name}</li>`)
    .join('')}
      </ul>
    </div>
    <div class='restaurant-menu-section'>
      <h5>Drinks:</h5>
      <ul>
        ${restaurant.menus.drinks
    .map((drink) => `<li tabindex='0'>${drink.name}</li>`)
    .join('')}
      </ul>
    </div>
  </div>
  <button id='toggle-reviews' class='toggle-button' aria-expanded='false' tabindex='0'>Show Reviews</button>
  <div id='reviews-section' class='restaurant-reviews' style='display:none;'>
    <h4>Customer Reviews:</h4>
    <ul>
      ${restaurant.customerReviews
    .map(
      (review) => `
          <li class='review-item'>
            <p class='review-user'><strong>${review.name}</strong> <span class='review-date'>(${review.date})</span></p>
            <p class='review-text'>${review.review}</p>
          </li>`,
    )
    .join('')}
    </ul>
  </div>
`;

export { generateRestaurantDetailHTML };
