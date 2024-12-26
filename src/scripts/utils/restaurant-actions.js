export const addEventListenersToRestaurantItems = () => {
  const restaurantItems = document.querySelectorAll(".restaurant-item");

  restaurantItems.forEach((item) => {
    // Klik pada elemen utama kartu restoran
    item.addEventListener("click", () => {
      const restaurantId = item.getAttribute("data-id");
      window.location.href = `#/detail/${restaurantId}`;
    });

    // Navigasi keyboard
    item.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault(); // Cegah scroll default
        const nextItem =
          event.key === "ArrowDown"
            ? item.nextElementSibling
            : item.previousElementSibling;

        if (nextItem && nextItem.classList.contains("restaurant-item")) {
          nextItem.focus();
        }
      } else if (
        (event.key === "Enter" || event.key === " ") &&
        document.activeElement === item
      ) {
        const restaurantId = item.getAttribute("data-id");
        window.location.href = `#/detail/${restaurantId}`;
      }
    });
  });
};
