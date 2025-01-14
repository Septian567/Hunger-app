/* eslint-disable no-undef */
import FavoritePage from '../src/scripts/views/pages/favoritePage'; // Sesuaikan dengan path yang benar
import FavRestoIdb from '../src/scripts/data/resto-idb'; // Sesuaikan dengan path yang benar

describe('Favorite Restaurants Page', () => {
  beforeEach(async () => {
    // Bersihkan data favorit sebelum setiap tes
    await FavRestoIdb.deleteResto(1);
    await FavRestoIdb.deleteResto(2);
    delete window.location;
    window.location = { href: '' };
    global.location.reload = jest.fn();
  });

  it('should render the information that no restaurant have been favorited', async () => {
    document.body.innerHTML = await FavoritePage.render();
    await FavoritePage.afterRender();

    const favoriteRestaurantsContainer = document.getElementById(
      'favorite-restaurants'
    );
    expect(favoriteRestaurantsContainer.innerHTML).toContain(
      'No favorite restaurants added yet.'
    );
  });

  it('should ask for the favorite restaurant', async () => {
    const getAllRestoMock = jest
      .spyOn(FavRestoIdb, 'getAllResto')
      .mockImplementation(() => []);
    document.body.innerHTML = await FavoritePage.render();
    await FavoritePage.afterRender();

    expect(getAllRestoMock).toHaveBeenCalledTimes(1);
    getAllRestoMock.mockRestore();
  });

  it('should show the information that no restaurant have been favorited', async () => {
    jest.spyOn(FavRestoIdb, 'getAllResto').mockResolvedValue([]);
    document.body.innerHTML = await FavoritePage.render();
    await FavoritePage.afterRender();

    const infoMessage = document.querySelector('.info-message');
    expect(infoMessage).toBeTruthy();
    expect(infoMessage.textContent).toBe('No favorite restaurants added yet.');
  });

  it('should render the restaurants', async () => {
    const mockRestaurants = [
      {
        id: 1,
        name: 'Restaurant A',
        description: 'Delicious A',
        pictureId: '1',
        city: 'City A',
        rating: 4.5,
      },
      {
        id: 2,
        name: 'Restaurant B',
        description: 'Delicious B',
        pictureId: '2',
        city: 'City B',
        rating: 4.0,
      },
    ];

    jest.spyOn(FavRestoIdb, 'getAllResto').mockResolvedValue(mockRestaurants);

    document.body.innerHTML = await FavoritePage.render();
    await FavoritePage.afterRender();

    const restaurantItems = document.querySelectorAll('.restaurant-item');
    expect(restaurantItems.length).toBe(mockRestaurants.length);

    restaurantItems.forEach((item, index) => {
      expect(item.textContent).toContain(mockRestaurants[index].name);
    });
  });

  it('should show the restaurants', async () => {
    const mockRestaurants = [
      {
        id: 1,
        name: 'Restaurant A',
        description: 'Delicious A',
        pictureId: '1',
        city: 'City A',
        rating: 4.5,
      },
      {
        id: 2,
        name: 'Restaurant B',
        description: 'Delicious B',
        pictureId: '2',
        city: 'City B',
        rating: 4.0,
      },
    ];

    jest.spyOn(FavRestoIdb, 'getAllResto').mockResolvedValue(mockRestaurants);

    document.body.innerHTML = await FavoritePage.render();
    await FavoritePage.afterRender();

    const favoriteRestaurantsContainer = document.getElementById(
      'favorite-restaurants'
    );

    expect(favoriteRestaurantsContainer.innerHTML).not.toBe('');

    mockRestaurants.forEach((restaurant) => {
      expect(favoriteRestaurantsContainer.innerHTML).toContain(restaurant.name);
    });
  });

  it('should show the delete button', async () => {
    const mockRestaurants = [
      {
        id: 1,
        name: 'Restaurant A',
        description: 'Delicious A',
        pictureId: '1',
        city: 'City A',
        rating: 4.5,
      },
      {
        id: 2,
        name: 'Restaurant B',
        description: 'Delicious B',
        pictureId: '2',
        city: 'City B',
        rating: 4.0,
      },
    ];

    jest.spyOn(FavRestoIdb, 'getAllResto').mockResolvedValue(mockRestaurants);

    document.body.innerHTML = await FavoritePage.render();
    await FavoritePage.afterRender();

    // Verifikasi keberadaan tombol hapus untuk setiap restoran
    const removeButtons = document.querySelectorAll('.remove-favorite-button');
    expect(removeButtons.length).toBe(mockRestaurants.length);

    removeButtons.forEach((button, index) => {
      expect(button.dataset.id).toBe(String(mockRestaurants[index].id));
    });
  });
});
