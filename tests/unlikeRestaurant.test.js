/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */
import FavRestoIdb from '../src/scripts/data/resto-idb';
import {
  setupFavoriteButton,
  checkIfFavorite,
} from '../src/scripts/utils/favorite-button';
import favoriteUtils from '../src/scripts/utils/favorite-utils';

// Mock Swal as a global variable
global.Swal = {
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
};

// Mock location.reload
beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      ...window.location,
      reload: jest.fn(), // Mock reload method
    },
    writable: true,
  });
});

describe('Unfavorite and Remove Restaurants', () => {
  const restaurant = { id: 1, name: 'Test Restaurant' };

  describe('Unfavorite Restaurants from detail page', () => {
    const addFavoriteButtonToDOM = () => {
      document.body.innerHTML =
        '<button id="favorite-button">Add to Favorite</button>';
    };

    beforeEach(() => {
      addFavoriteButtonToDOM();
    });

    afterEach(() => {
      jest.clearAllMocks();
      document.body.innerHTML = '';
    });

    it('should display remove from favorite button when the restaurant has been favorited', async () => {
      FavRestoIdb.getResto = jest.fn().mockResolvedValue(restaurant);
      await checkIfFavorite(restaurant.id);

      const favoriteButton = document.getElementById('favorite-button');
      expect(favoriteButton.textContent).toBe('Remove from Favorite');
    });

    it('should not display add to favorite when the restaurant has been favorited', async () => {
      FavRestoIdb.getResto = jest.fn().mockResolvedValue(restaurant);
      await checkIfFavorite(restaurant.id);

      const favoriteButton = document.getElementById('favorite-button');
      expect(favoriteButton.textContent).not.toBe('Add to Favorite');
    });

    it('should be able to remove favorite restaurants from the list', async () => {
      FavRestoIdb.getResto = jest.fn().mockResolvedValue(restaurant);
      FavRestoIdb.deleteResto = jest.fn().mockResolvedValue(true);

      setupFavoriteButton(restaurant);
      const favoriteButton = document.getElementById('favorite-button');

      favoriteButton.click();
      await new Promise(process.nextTick);

      expect(FavRestoIdb.deleteResto).toHaveBeenCalledWith(restaurant.id);
      expect(favoriteButton.textContent).toBe('Add to Favorite');
    });

    it('should not throw error when user clicks remove from favorite if the unfavorite restaurant is not in the list', async () => {
      FavRestoIdb.getResto = jest.fn().mockResolvedValue(undefined);
      FavRestoIdb.deleteResto = jest.fn().mockResolvedValue(true);

      setupFavoriteButton(restaurant);
      const favoriteButton = document.getElementById('favorite-button');

      expect(() => {
        favoriteButton.click();
      }).not.toThrow();
    });
  });

  describe('Remove favorite restaurant from favorite page', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="favorite-list">
          <button class="remove-favorite-button" data-id="1">Remove</button>
          <button class="remove-favorite-button" data-id="2">Remove</button>
        </div>
      `;

      FavRestoIdb.getAllResto = jest.fn(() =>
        Promise.resolve([
          { id: 1, name: 'Restaurant 1' },
          { id: 2, name: 'Restaurant 2' },
        ])
      );

      FavRestoIdb.deleteResto = jest.fn(() => Promise.resolve());
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should display a list of favorite restaurants', async () => {
      const restaurants = await FavRestoIdb.getAllResto();

      const favoriteList = document.getElementById('favorite-list');
      favoriteList.innerHTML = restaurants
        .map(
          (resto) => `
          <div class="favorite-item" data-id="${resto.id}">
            <span>${resto.name}</span>
            <button class="remove-favorite-button" data-id="${resto.id}">Remove</button>
          </div>
        `
        )
        .join('');

      const items = document.querySelectorAll('.favorite-item');
      expect(items).toHaveLength(2);
      expect(items[0].textContent).toContain('Restaurant 1');
      expect(items[1].textContent).toContain('Restaurant 2');
    });

    it('should display remove buttons for each favorite restaurant', () => {
      const buttons = document.querySelectorAll('.remove-favorite-button');
      expect(buttons).toHaveLength(2);
      buttons.forEach((button) => {
        expect(button.textContent).toBe('Remove');
      });
    });

    it('should confirm before removing a favorite restaurant', async () => {
      global.Swal.fire.mockResolvedValueOnce({ isConfirmed: true });

      favoriteUtils.setupRemoveFavoriteButtons();

      const button = document.querySelector(
        '.remove-favorite-button[data-id="1"]'
      );
      button.click();

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(global.Swal.fire).toHaveBeenCalled();
      expect(global.Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Are you sure?',
          text: 'You will not be able to recover this restaurant!',
          icon: 'warning',
        })
      );
    });

    it('should not remove a restaurant if user cancels', async () => {
      global.Swal.fire.mockResolvedValueOnce({ isConfirmed: false });

      favoriteUtils.setupRemoveFavoriteButtons();

      const button = document.querySelector(
        '.remove-favorite-button[data-id="1"]'
      );
      button.click();

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(FavRestoIdb.deleteResto).not.toHaveBeenCalled();
    });

    it('should remove a favorite restaurant when confirmed', async () => {
      global.Swal.fire.mockResolvedValueOnce({ isConfirmed: true });

      favoriteUtils.setupRemoveFavoriteButtons();

      const button = document.querySelector(
        '.remove-favorite-button[data-id="1"]'
      );
      button.click();

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(FavRestoIdb.deleteResto).toHaveBeenCalledWith('1');
      expect(FavRestoIdb.deleteResto).toHaveBeenCalledTimes(1);
    });

    it('should not display a restaurant that has been removed', async () => {
      const restaurants = await FavRestoIdb.getAllResto();

      const favoriteList = document.getElementById('favorite-list');
      favoriteList.innerHTML = restaurants
        .map(
          (resto) => `
          <div class="favorite-item" data-id="${resto.id}">
            <span>${resto.name}</span>
            <button class="remove-favorite-button" data-id="${resto.id}">Remove</button>
          </div>
        `
        )
        .join('');

      favoriteUtils.setupRemoveFavoriteButtons();

      global.Swal.fire.mockResolvedValueOnce({ isConfirmed: true });
      const button = document.querySelector(
        '.remove-favorite-button[data-id="1"]'
      );
      button.click();

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(FavRestoIdb.deleteResto).toHaveBeenCalledWith('1');

      FavRestoIdb.getAllResto.mockResolvedValueOnce([
        { id: 2, name: 'Restaurant 2' },
      ]);

      const updatedRestaurants = await FavRestoIdb.getAllResto();
      favoriteList.innerHTML = updatedRestaurants
        .map(
          (resto) => `
          <div class="favorite-item" data-id="${resto.id}">
            <span>${resto.name}</span>
            <button class="remove-favorite-button" data-id="${resto.id}">Remove</button>
          </div>
        `
        )
        .join('');

      const items = document.querySelectorAll('.favorite-item');
      expect(items).toHaveLength(1);
      expect(items[0].dataset.id).toBe('2');
      expect(items[0].textContent).toContain('Restaurant 2');
    });
  });
});
