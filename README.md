# React E-commerce Store

A modern e-commerce web application built with React, featuring product browsing, category filtering, cart functionality, and persistent storage.

## Features

- **Product Catalog**: Browse a comprehensive collection of products from various categories
- **Category Filtering**: Filter products by selecting specific categories
- **Search Functionality**: Search for products by name or description
- **Shopping Cart**: Add, remove, and adjust quantities of products in your cart
- **Persistent Storage**: Cart and product data are saved in localStorage for a seamless experience
- **Responsive Design**: Optimized for both desktop and mobile devices

## Technology Stack

- **React**: Frontend library for building the user interface
- **Context API**: State management for the application
- **Axios**: HTTP client for API requests
- **localStorage**: For data persistence between sessions
- **Fake Store API**: External API for product data (https://fakestoreapi.com)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/31UTKARSH07/EndTermProject
   ```

2. Navigate to the project directory:
   ```
   cd react-ecommerce-store
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`

## Usage

- Browse products on the home page
- Filter products by selecting a category
- Search for specific products using the search bar
- Click on a product to view details
- Add products to your cart
- Adjust quantities or remove items from your cart
- Proceed to checkout

## Project Structure

The core of the application is managed by the `StoreContext` which provides:
- Product data management
- Category filtering
- Cart operations
- API interaction

## API Integration

This project uses the [Fake Store API](https://fakestoreapi.com) to fetch product data, including:
- Product listings
- Product categories
- Product details

## Future Enhancements

- User authentication
- Payment gateway integration
- Order history
- Wishlist functionality
- Product reviews and ratings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.