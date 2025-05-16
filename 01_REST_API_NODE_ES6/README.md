# REST API NODE_JS

A clean, modular REST API built with Node.js and Express, following best practices such as layered architecture (routing, validation, controller, service, repository), middleware, and utility helpers. This project demonstrates how to structure scalable and maintainable backend code using modern tools.

---

## Features

- RESTful API endpoints with clear separation of concerns:
  - **Routing layer** handles URL endpoints.
  - **Validation layer** validates incoming requests.
  - **Controller layer** processes requests and responses.
  - **Service layer** contains business logic.
  - **Repository layer** manages data (in-memory for now).
- Middleware for logging, validation, and error handling.
- Config folder for environment variables and app configuration.
- Utilities folder for helper functions.
- Uses UUIDs for unique user IDs.
- Input sanitization with `bad-words` package.
- Request validation powered by `zod`.
- Supports environment variables with `dotenv`.
- Developed using ES Modules (`\"type\": \"module\"`).
- Dev workflow powered by `nodemon` for hot reload.

---

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **UUID** - Unique identifiers
- **Bad-words** - Profanity filter
- **Zod** - Runtime validation schema
- **Dotenv** - Environment variables
- **Nodemon** - Dev server auto reload

---

## Project Structure

- this is how mvc is implemented in this project.
- ![project flow](./Notes/project%20flow%20mvc.png)

- **src/**
  - **routes/** - Define API routes.
  - **validator/** - Handle validation logic on request level.
  - **controllers/** - Handle request logic.
  - **services/** - Business logic and orchestration.
  - **repositories/** - Data access layer (mocked with in-memory array).
  - **middleware/** - Custom Express middlewares (validation, logging, etc.).
  - **config/** - Configuration files (e.g., server settings).
  - **utils/** - Utility helpers and collections.
- **package.json** - Project dependencies and scripts.

---

## Some Additional Features

- CRUD operations for users with proper RESTful routes.
- Validation middleware to ensure proper input data on POST and PUT requests.
- Custom logging middleware that logs detailed request info including method, URL, status code, duration, IP, and user-agent.
- Simple in-memory data store using an array of user objects (with UUID for IDs).
- Use of modern ES modules (`import/export`).
- Environment variable support with `dotenv`.
- Bad-words filtering integrated for user data sanitization.
- Clean error handling with meaningful messages.
- Nodemon support for automatic server restarts during development.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repo:

    ```bash
    git clone https://github.com/yourusername/01_rest_api_node.git
    cd 01_rest_api_node
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root (if needed) and add configuration variables such as:

    ```env
    PORT=3000
    ```

### Running the App

- Start the server in development mode with auto-reload:

    ```bash
    npm run dev
    ```

- Or start normally:

    ```bash
    npm start
    ```

Server will run at `http://localhost:<PORT>` (default 3000).

---

## Example Usage

### Create a User

```http
POST /users
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "hobby": "Coding"
}
```

### Get All Users

```http
GET /users
```

### Get User by ID

```http
GET /users/:id
```

### Update User

```http
PUT /users/:id
Content-Type: application/json

{
  "firstName": "Jane",
  "hobby": "Reading"
}
```

### Delete User

```http
DELETE /users/:id
```

---

## Middleware Details

- **Validation Middleware:** Ensures `firstName`, `lastName`, and `hobby` are present on POST/PUT requests.
- **Logging Middleware:** Logs detailed info for each request, including duration and headers.
- **Bad-Words Filter:** Sanitizes user inputs to prevent inappropriate content.

---

## Dependencies

- [Express](https://expressjs.com/) - Web framework
- [uuid](https://www.npmjs.com/package/uuid) - For generating unique user IDs
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables
- [bad-words](https://www.npmjs.com/package/bad-words) - Profanity filtering
- [zod](https://www.npmjs.com/package/zod) - Schema validation (optional, for validation logic)

---
---

## Contribution Guidelines

Contributions are welcome! Please follow these steps:

1. Fork the repo  
2. Create a new branch (`git checkout -b feature/your-feature`)  
3. Commit your changes (`git commit -m 'Add some feature'`)  
4. Push to the branch (`git push origin feature/your-feature`)  
5. Open a Pull Request  

Please ensure your code follows the existing style and is well-tested.

---

## Contact

Feel free to reach out for questions or collaboration:  
**Email:** <ankitnegi9104@gmail.com>  
**GitHub:** [github.com/ankitNegiDev](https://github.com/ankitNegiDev)

---

## Author

Ankit Negi

---

## License

This project is licensed under the ISC License.
