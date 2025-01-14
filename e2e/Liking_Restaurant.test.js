/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/Favorite');
});
Scenario('liking one restaurant', async ({ I }) => {
  I.see('No favorite restaurants added yet', '.info-message');
  // pause();
  I.amOnPage('/');
  pause();
  I.seeElement('.restaurant-name');
  const firstRestaurant = locate('.restaurant-name').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#favorite-button');
  I.click('#favorite-button');

  I.amOnPage('/#/Favorite');
  I.seeElement('.restaurant-item');

  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-name');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
  // pause();
});

Scenario('unliking a restaurant from detail Page', async ({ I }) => {
  I.see('No favorite restaurants added yet', '.info-message');

  // Tambahkan restoran ke favorit terlebih dahulu
  I.amOnPage('/');
  I.seeElement('.restaurant-name');
  // pause();
  const firstRestaurant = locate('.restaurant-name').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#favorite-button');
  I.click('#favorite-button');

  // Buka halaman favorit dan pastikan restoran ada
  I.amOnPage('/#/Favorite');
  I.seeElement('.restaurant-item');

  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-name');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // Unlike restoran
  I.click('.restaurant-name a'); // Klik restoran di daftar favorit
  I.seeElement('.favorite-button.remove');
  I.click('.favorite-button.remove'); // Klik tombol unlike

  // Pastikan restoran telah dihapus dari daftar favorit
  I.amOnPage('/#/Favorite');
  I.see('No favorite restaurants added yet', '.info-message');
  pause();
});

Scenario('unliking a restaurant from favorite page', async ({ I }) => {
  I.see('No favorite restaurants added yet', '.info-message');

  // Tambahkan restoran ke favorit terlebih dahulu
  I.amOnPage('/');
  I.seeElement('.restaurant-name');
  // pause();
  const firstRestaurant = locate('.restaurant-name').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#favorite-button');
  I.click('#favorite-button');

  // Buka halaman favorit dan pastikan restoran ada
  I.amOnPage('/#/Favorite');
  I.seeElement('.restaurant-item');

  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-name');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // Unlike restoran
  I.seeElement('.remove-favorite-button');
  I.click('.remove-favorite-button'); // Klik tombol unlike

  I.seeElement('.swal2-confirm.swal2-styled.swal2-default-outline');
  I.click('.swal2-confirm.swal2-styled.swal2-default-outline'); // Klik tombol unlike

  I.seeElement('.swal2-actions');
  I.click('.swal2-actions'); // Klik tombol unlike

  // Pastikan restoran telah dihapus dari daftar favorit
  I.amOnPage('/#/Favorite');
  I.see('No favorite restaurants added yet', '.info-message');

  I.amOnPage('/');
  I.seeElement('.restaurant-name');
  // pause();
  const firstRestaurantAgain = locate('.restaurant-name').first();
  I.click(firstRestaurantAgain);

  I.seeElement('#favorite-button');
  pause();
});
