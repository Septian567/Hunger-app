/* eslint-disable no-undef */
import FavRestoIdb from '../src/scripts/data/resto-idb';
import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContracts';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    const restos = await FavRestoIdb.getAllResto();
    restos.forEach(async (resto) => {
      await FavRestoIdb.deleteResto(resto.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavRestoIdb);
});
