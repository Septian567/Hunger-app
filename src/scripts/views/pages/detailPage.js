import CONFIG from "../../globals/config";
import { generateRestaurantDetailHTML } from "../templates/detail-template";
import { setupFavoriteButton, checkIfFavorite } from "../../utils/favorite-button";
import { setupToggleMenuAndReviews } from "../../utils/toggle-buttons";
import { setupKeyboardNavigation } from "../../utils/keyboard-navigation";

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
        generateRestaurantDetailHTML(restaurant);

      // Cek status favorit restoran dan atur tombolnya
      checkIfFavorite(id);

      // Event listener untuk tombol favorit
      setupFavoriteButton(restaurant);

      // Add event listeners for toggle buttons
      setupToggleMenuAndReviews();

      // Tambahkan interaksi keyboard pada menu
      setupKeyboardNavigation();
    } catch (error) {
      restaurantDetailElement.innerHTML = `<p>Error fetching restaurant data: ${error.message}</p>`;
    }
  },
};

export default detailPage;
