class RestaurantCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isSelected = false; // Menyimpan status terpilih
  }

  set restaurant(data) {
    this._restaurant = data;
    this.render();
  }

  render() {
    const altText = this._restaurant.altText || this._restaurant.name;

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          text-align: left;
          background-color: white;
          padding: 10px;
          cursor: pointer;
        }

        .card.selected {
          border: 2px solid #007bff;
          background-color: #f0f8ff;
        }

        .card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .card .content {
          padding: 16px;
        }

        .card .city {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          top: 8px;
          left: 8px;
          font-size: 0.9rem;
          border-radius: 4px;
        }

        .card h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .card p {
          margin: 8px 0;
          color: #555;
        }

        .card .rating {
          margin-top: 8px;
          font-size: 1rem;
          color: #ff8800;
        }

        .alt-text {
          display: none;
          width: 100%;
          height: 200px;
          background-color: #f3f3f3;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #999;
          text-align: center;
        }
      </style>

      <div class="card" tabindex="0">
        <div style="position: relative;">
          <img src="https://restaurant-api.dicoding.dev/images/small/${
  this._restaurant.pictureId
}" 
               alt="${altText}" 
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
               onload="this.nextElementSibling.style.display='none';">
          <span class="alt-text">${altText}</span>
          <span class="city">${this._restaurant.city}</span>
        </div>
        <div class="content">
          <h3>${this._restaurant.name}</h3>
          <p>${this._restaurant.description.slice(0, 100)}...</p>
          <div class="rating">⭐ ${this._restaurant.rating}</div>
        </div>
      </div>
    `;

    const cardElement = this.shadowRoot.querySelector('.card');

    cardElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.selectCard();
      }
    });

    cardElement.addEventListener('focus', () => {
      cardElement.classList.add('selected');
    });

    cardElement.addEventListener('blur', () => {
      cardElement.classList.remove('selected');
    });
  }

  selectCard() {
    const cardElement = this.shadowRoot.querySelector('.card');
    cardElement.classList.toggle('selected');
  }
}

customElements.define('restaurant-card', RestaurantCard);
