export const addEventListenersToRestaurantItems = () => {
  const restaurantItems = document.querySelectorAll('.restaurant-item');

  restaurantItems.forEach((item) => {
    // Klik pada elemen utama kartu restoran
    item.addEventListener('click', () => {
      const restaurantId = item.getAttribute('data-id');
      window.location.href = `#/detail/${restaurantId}`;
    });
  });
};
