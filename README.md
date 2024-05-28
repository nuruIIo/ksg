Sure, here's a README file for your project:

---

# User Balance Management API

## Overview

This API provides functionalities for managing user balances in a database. Users can make purchases, and their balances are updated accordingly. The API ensures that transactions are handled securely and efficiently.

## Features

- Fetch items from an external API with caching
- Update user balances after purchases
- Handle errors gracefully

## Prerequisites

- Node.js
- PostgreSQL

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up PostgreSQL**:

   - Create a database and a `users` table with `id` and `balance` columns.
   - Add a user with `id = 1` for testing.

   Example SQL commands:

   ```sql
   CREATE DATABASE your_database_name;

   \c your_database_name

   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     balance NUMERIC
   );

   INSERT INTO users (id, balance) VALUES (1, 500); -- Example user
   ```

4. **Configure the database connection**:
   - Create a file named `.env` in the root directory with your database credentials:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
   ```

## Running the API

1. **Start the server**:

   ```bash
   npm start
   ```

2. The server will be running at `http://localhost:3000`.

## API Endpoints

### Fetch Items with Caching

- **Endpoint**: `GET /items`
- **Description**: Fetches items from an external API with caching.
- **Request Parameters**: `app_id=730`, `currency=USD`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Item Name",
      "min_tradable_price": 10.00,
      "min_non_tradable_price": 8.00,
      ...
    },
    ...
  ]
  ```

### Update User Balance

- **Endpoint**: `POST /purchase`
- **Description**: Deducts the specified amount from the user's balance if sufficient.
- **Request Body**:
  ```json
  {
    "userId": 1,
    "amount": 100
  }
  ```
- **Response**:
  - On success:
    ```json
    {
      "message": "Balance updated successfully",
      "newBalance": 400
    }
    ```
  - On insufficient balance:
    ```json
    {
      "message": "Insufficient balance"
    }
    ```
  - On user not found:
    ```json
    {
      "message": "User not found"
    }
    ```
  - On error:
    ```json
    {
      "message": "Error updating balance"
    }
    ```

## Error Handling

- The API handles errors gracefully and provides appropriate HTTP status codes and messages.
- Errors are logged for debugging purposes.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Axios
- NodeCache

## Development

1. **Run in development mode**:

   ```bash
   npm run dev
   ```

2. **Linting**:
   ```bash
   npm run lint
   ```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please open an issue or contact me at [mingboyevnurullo0@gmail.com].
