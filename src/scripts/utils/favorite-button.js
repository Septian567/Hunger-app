import FavRestoIdb from '../data/resto-idb';

const checkIfFavorite = async (id) => {
  const favorite = await FavRestoIdb.getResto(id);
  const favoriteButton = document.getElementById('favorite-button');

  if (favorite) {
    favoriteButton.textContent = 'Remove from Favorite';
    favoriteButton.classList.add('remove');
  } else {
    favoriteButton.textContent = 'Add to Favorite';
    favoriteButton.classList.remove('remove');
  }
};

const setupFavoriteButton = (restaurant) => {
  const favoriteButton = document.getElementById('favorite-button');

  favoriteButton.addEventListener('click', async () => {
    const favorite = await FavRestoIdb.getResto(restaurant.id);

    if (favorite) {
      await FavRestoIdb.deleteResto(restaurant.id);
      favoriteButton.textContent = 'Add to Favorite';
      favoriteButton.classList.remove('remove');
    } else {
      await FavRestoIdb.putResto(restaurant);
      favoriteButton.textContent = 'Remove from Favorite';
      favoriteButton.classList.add('remove');
    }
  });
};

export { checkIfFavorite, setupFavoriteButton };
