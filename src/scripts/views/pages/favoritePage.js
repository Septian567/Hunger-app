import FavRestoIdb from "../../data/resto-idb";
import {
  addKeyboardNavigation,
  addClickListenersToRestaurants,
  setupRemoveFavoriteButtons,
} from "../../utils/button-actions";
import { generateRestaurantListHTML } from "../templates/favorite-template"; // Import template functions

const favoritePage = {
  async render() {
    return `
      <h2>Favorite Restaurants</h2>
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
        generateRestaurantListHTML(favoriteRestaurants); // Use the template function

      // Implement the functions from button-actions.js
      addKeyboardNavigation();
      addClickListenersToRestaurants();
      setupRemoveFavoriteButtons();
    } catch (error) {
      favoriteRestaurantsContainer.innerHTML = `<p>Error fetching favorite restaurants: ${error.message}</p>`;
    }
  },
};

export default favoritePage;
