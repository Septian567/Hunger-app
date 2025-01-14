import CONFIG from '../globals/config';

export const fetchRestaurants = async () => {
  const response = await fetch(`${CONFIG.BASE_URL}list`);
  const data = await response.json();

  return data.restaurants.map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
    description: restaurant.description,
    pictureId: `${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}`,
    city: restaurant.city,
    rating: restaurant.rating,
    altText: `Image of ${restaurant.name} restaurant`,
  }));
};
