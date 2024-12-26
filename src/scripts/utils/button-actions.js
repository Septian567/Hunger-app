// button-actions.js

export function addKeyboardNavigation() {
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
}

export function addClickListenersToRestaurants() {
  const restaurantItems = document.querySelectorAll(".restaurant-item");
  restaurantItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (!event.target.classList.contains("remove-favorite-button")) {
        const restaurantId = item.getAttribute("data-id");
        window.location.href = `#/detail/${restaurantId}`;
      }
    });
  });
}

export function setupRemoveFavoriteButtons() {
  const removeFavoriteButtons = document.querySelectorAll(
    ".remove-favorite-button"
  );
  removeFavoriteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation(); // Prevent triggering the item click listener
      const id = event.target.dataset.id;

      try {
        await FavRestoIdb.deleteResto(id);
        this.afterRender();
      } catch (error) {
        console.error("Failed to remove favorite restaurant:", error);
      }
    });
  });
}
