/* eslint-disable no-unused-vars */
import CONFIG from '../../globals/config';
import { generateRestaurantListHTML } from '../templates/restaurant-template';
import { showError, showInfo } from '../../utils/status-message';
// import { addEventListenersToRestaurantItems } from '../../utils/restaurant-actions';


const mainPage = {
  async render() {
    return `
      <h2>Explore Restaurants</h2>
      <div id='restaurant-list' class='restaurant-list'></div>
      <div id='status-message' class='status-message' style='display: none;'></div>
    `;
  },

  async afterRender() {
    const restaurantListElement = document.getElementById('restaurant-list');
    const statusMessageElement = document.getElementById('status-message');

    try {
      // Fetching data from API
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
        // Display restaurant list
        restaurantListElement.innerHTML =
          generateRestaurantListHTML(restaurants); // No second parameter for favorite page
        // Add event listeners to restaurant items
        // addEventListenersToRestaurantItems();
      } else {
        // Display info message if no restaurants are found
        showInfo(statusMessageElement, 'No restaurants available.');
      }
    } catch (error) {
      // Display error message if something goes wrong
      showError(
        statusMessageElement,
        'There seems to be an issue with the connection. Please try again later.',
      );
      restaurantListElement.innerHTML = ''; // Clear the restaurant list
    }
  },
};

export default mainPage;
