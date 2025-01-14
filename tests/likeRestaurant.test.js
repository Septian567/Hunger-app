/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */

import FavRestoIdb from '../src/scripts/data/resto-idb';
import {
  setupFavoriteButton,
  checkIfFavorite,
} from '../src/scripts/utils/favorite-button';

jest.mock('../src/scripts/data/resto-idb'); // Mock IndexedDB untuk sebagian test

describe('Liking A Restaurant', () => {
  const addFavoriteButton = (buttonText = 'Add to Favorite') => {
    document.body.innerHTML = `<button id="favorite-button">${buttonText}</button>`;
  };

  const restaurant = { id: 1, name: 'Restaurant Test' };

  beforeEach(() => {
    addFavoriteButton(); // Setup tombol favorit ke DOM
    jest.clearAllMocks(); // Reset semua mock
  });

  it('should show "Add to Favorite" button when the restaurant has not been added to favorite', async () => {
    FavRestoIdb.getResto = jest.fn().mockResolvedValue(null); // Mock restaurant not in favorites
    await checkIfFavorite(restaurant.id);

    const favoriteButton = document.getElementById('favorite-button');
    expect(favoriteButton.textContent).toBe('Add to Favorite');
    expect(favoriteButton.classList.contains('remove')).toBe(false);
  });

  it('should not show "Remove from Favorite" when the restaurant has not been added to favorite', async () => {
    FavRestoIdb.getResto = jest.fn().mockResolvedValue(null); // Mock restaurant not in favorites
    await checkIfFavorite(restaurant.id);

    const favoriteButton = document.getElementById('favorite-button');
    expect(favoriteButton.textContent).not.toBe('Remove from Favorite');
    expect(favoriteButton.classList.contains('remove')).toBe(false);
  });

  it('should be able to add the restaurant to favorite', async () => {
    FavRestoIdb.putResto = jest.fn().mockResolvedValue(true);

    setupFavoriteButton(restaurant);

    const button = document.getElementById('favorite-button');
    button.click();

    await new Promise(process.nextTick);

    expect(FavRestoIdb.putResto).toHaveBeenCalledWith(restaurant);
    expect(button.textContent).toBe('Remove from Favorite');
    expect(button.classList.contains('remove')).toBe(true);
  });

  it('should not add the same restaurant to favorite again', async () => {
    FavRestoIdb.getAllResto = jest.fn().mockResolvedValue([restaurant]); // Mock existing favorite

    setupFavoriteButton(restaurant);

    const favoriteButton = document.getElementById('favorite-button');
    favoriteButton.click();

    const favorites = await FavRestoIdb.getAllResto();
    expect(favorites).toEqual([restaurant]); // Only one restaurant should exist
  });

  it('should not add a restaurant to favorite if it does not have an id', async () => {
    const invalidRestaurant = { name: 'Invalid Restaurant' }; // Restaurant without id
    FavRestoIdb.putResto = jest.fn(); // Mock putResto with no calls

    setupFavoriteButton(invalidRestaurant);

    const favoriteButton = document.getElementById('favorite-button');
    favoriteButton.click();

    expect(FavRestoIdb.putResto).not.toHaveBeenCalled(); // Ensure no call is made
  });

  it('should store the restaurant in IDB', async () => {
    FavRestoIdb.putResto = jest.fn().mockResolvedValue(true);

    await FavRestoIdb.putResto(restaurant);

    expect(FavRestoIdb.putResto).toHaveBeenCalledWith(restaurant);

    FavRestoIdb.getResto = jest.fn().mockResolvedValue(restaurant);
    const storedResto = await FavRestoIdb.getResto(restaurant.id);
    expect(storedResto).toEqual(restaurant);
  });
});
