import favoriteTemplate from '../templates/favorite-template';
import favoriteUtils from '../../utils/favorite-utils';
import FavRestoIdb from '../../data/resto-idb';

const favoritePage = {
  async render() {
    return `
      <h2>Favorite Restaurants</h2>
      <div id='favoriteContent'>
        <div id='favorite-restaurants' class='restaurant-list'></div>
      </div>
    `;
  },

  async afterRender() {
    const favoriteRestaurantsContainer = document.getElementById(
      'favorite-restaurants',
    );

    try {
      const favoriteRestaurants = await FavRestoIdb.getAllResto();

      if (favoriteRestaurants.length === 0) {
        favoriteRestaurantsContainer.innerHTML =
          '<p class=\'info-message\'>No favorite restaurants added yet.</p>';
        return;
      }

      favoriteRestaurantsContainer.innerHTML =
        favoriteTemplate.generateRestaurantListHTML(favoriteRestaurants);
      // favoriteUtils.addClickListenersToRestaurants();
      favoriteUtils.setupRemoveFavoriteButtons();
    } catch (error) {
      favoriteRestaurantsContainer.innerHTML = `
        <p class='error-message'>
          Error fetching favorite restaurants: ${error.message}
        </p>`;
    }
  },
};

export default favoritePage;
