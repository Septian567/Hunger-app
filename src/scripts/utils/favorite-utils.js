import Swal from "sweetalert2";
import FavRestoIdb from "../data/resto-idb";


const favoriteUtils = {
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

              // SweetAlert success dialog
              Swal.fire({
                title: "Deleted!",
                text: "The restaurant has been removed from favorites.",
                icon: "success",
                confirmButtonColor: "#3085d6",
              }).then(() => {
                location.reload(); // Refresh the page to update the favorite list
              });
            } catch (error) {
              Swal.fire({
                title: "Error",
                text: "Failed to remove the restaurant. Please try again later.",
                icon: "error",
                confirmButtonColor: "#d33",
              });
              console.error("Failed to remove favorite restaurant:", error);
            }
          }
        });
      });
    });
  },
};

export default favoriteUtils;
