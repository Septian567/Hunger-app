import CONFIG from "../../globals/config";
import FavRestoIdb from "../../data/resto-idb";
import Swal from "sweetalert2";

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
          <p class="restaurant-description-card">${description.slice(
            0,
            50
          )}...</p>
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

        // SweetAlert confirmation dialog
        Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to recover this restaurant!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await FavRestoIdb.deleteResto(id);
              Swal.fire(
                "Deleted!",
                "The restaurant has been removed from favorites.",
                "success"
              );
              location.reload(); // Refresh the page to update the favorite list
            } catch (error) {
              Swal.fire(
                "Error",
                "Failed to remove the restaurant. Please try again later.",
                "error"
              );
              console.error("Failed to remove favorite restaurant:", error);
            }
          }
        });
      });
    });
  },
};

export default favoriteTemplate;
