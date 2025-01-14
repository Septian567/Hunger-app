/* eslint-disable no-undef */
const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    const resto = { id: 1, name: 'Resto A' };
    await favoriteRestaurant.putResto(resto);

    const fetchedResto = await favoriteRestaurant.getResto(1);
    expect(fetchedResto).toEqual(resto);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    const invalidResto = { name: 'Invalid Resto' };
    await favoriteRestaurant.putResto(invalidResto);

    const allRestos = await favoriteRestaurant.getAllResto();
    expect(allRestos).toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    const resto1 = { id: 1, name: 'Resto A' };
    const resto2 = { id: 2, name: 'Resto B' };

    await favoriteRestaurant.putResto(resto1);
    await favoriteRestaurant.putResto(resto2);

    const allRestos = await favoriteRestaurant.getAllResto();
    expect(allRestos).toEqual([resto1, resto2]);
  });

  it('should remove favorite restaurant', async () => {
    const resto = { id: 1, name: 'Resto A' };
    await favoriteRestaurant.putResto(resto);

    await favoriteRestaurant.deleteResto(1);

    const allRestos = await favoriteRestaurant.getAllResto();
    expect(allRestos).toEqual([]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    await favoriteRestaurant.deleteResto(1);

    const allRestos = await favoriteRestaurant.getAllResto();
    expect(allRestos).toEqual([]);
  });
};

export { itActsAsFavoriteRestaurantModel };
