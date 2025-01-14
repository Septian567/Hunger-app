/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContracts';

const favoriteRestaurantArray = {
  _restaurants: [],

  async getResto(id) {
    if (!id) {
      return;
    }
    return this._restaurants.find((resto) => resto.id === id);
  },

  async getAllResto() {
    return this._restaurants;
  },

  async putResto(resto) {
    if (!resto.hasOwnProperty('id')) {
      return;
    }

    // Cek apakah restoran sudah ada
    if (await this.getResto(resto.id)) {
      return;
    }

    this._restaurants.push(resto);
  },

  async deleteResto(id) {
    this._restaurants = this._restaurants.filter((resto) => resto.id !== id);
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestaurantArray._restaurants = [];
  });

  itActsAsFavoriteRestaurantModel(favoriteRestaurantArray);
});
