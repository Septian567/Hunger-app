document.addEventListener('DOMContentLoaded', async () => {
  const restaurantGrid = document.querySelector('.restaurant-grid');

  try {
    // Fetch data dari API /list
    const response = await fetch('https://restaurant-api.dicoding.dev/list');

    if (!response.ok) {
      throw new Error('Failed to fetch restaurant data from API');
    }

    const { restaurants } = await response.json();

    // Loop setiap restoran dan buat elemen <restaurant-card>
    restaurants.forEach((restaurant) => {
      const card = document.createElement('restaurant-card');

      // Tambahkan data ke web component
      card.restaurant = {
        ...restaurant,
        imageUrl: `https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`, // Tambahkan URL gambar
      };

      restaurantGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading restaurant data:', error);
  }
});

const menuButton = document.getElementById('menu-button');
const navLinks = document.getElementById('nav-links');

menuButton.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
