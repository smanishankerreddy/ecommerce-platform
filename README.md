# E-Commerce Product Showcase

A simple and professional e-commerce product showcase designed for small businesses. This project allows businesses to display their products online without the need for a complex backend.

## Features

- Responsive product grid layout
- Search, category filters, and sort options
- "On Sale" highlighting
- Modal product view with detailed information
- Add to cart functionality with persistent storage (localStorage)
- Mobile-friendly design
- Optional: Hero slider using Swiper.js

## Technologies Used

- **HTML** – Structure of the page
- **CSS** – Styling and responsive design
- **JavaScript** – Product filtering, modal, and cart functionality
- **Swiper.js** (optional) – For hero image sliders

## Project Structure

├── index.html
├── style.css
├── script.js
├── data/
│ └── products.json
└── assets/
├── favicon.svg
└── images


## How It Works

1. Products are loaded from a JSON file (`products.json`).
2. Users can search, filter by category, or sort products.
3. Clicking "View" opens a modal with detailed product info.
4. Clicking "Add" adds the product to the cart (stored in localStorage).
5. Cart popup shows all added products with quantity controls.

## Usage

1. Open `index.html` in a web browser.
2. Browse products, apply filters, and add items to the cart.
3. Use the modal for detailed product information.
4. Checkout directly from the cart popup.

## Notes

- No backend is required; all data is frontend-only.
- LocalStorage is used to persist cart items between sessions.
- Swiper.js can be used optionally for a hero image slider.

## License

This project is open-source and free to use for small businesses.
