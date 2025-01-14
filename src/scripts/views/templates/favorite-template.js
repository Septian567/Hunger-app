import CONFIG from '../../globals/config';

const favoriteTemplate = {
  generateRestaurantListHTML(restaurants) {
    return restaurants.map(this.generateRestaurantItemHTML).join('');
  },

  generateRestaurantItemHTML(restaurant) {
    const { id, pictureId, name, city, rating } = restaurant;

    return `
      <article class='restaurant-item' data-id='${id}'>
        <figure class='restaurant-image-container'>
          <img 
            src='${CONFIG.BASE_IMAGE_URL}${pictureId}' 
            alt='Image of ${name} restaurant' 
            class='restaurant-image' 
            loading='lazy' 
          />
          <figcaption class='restaurant-city'>${city}</figcaption>
        </figure>
        <section class='restaurant-info'>
          <h3 class='restaurant-name'><a href="#/detail/${id}" class="restaurant-item-link">${name}</a></h3>
          <div class='restaurant-actions'>
            <div class='restaurant-rating'>
              <span class='rating-icon'>⭐</span> ${rating}
            </div>
            <button 
              class='remove-favorite-button' 
              data-id='${id}' 
              aria-label='Remove ${name} from favorites'
              title='Remove ${name} from favorites'
            >
              🗑️
            </button>
          </div>
        </section>
      </article>
    `;
  },
};

export default favoriteTemplate;
