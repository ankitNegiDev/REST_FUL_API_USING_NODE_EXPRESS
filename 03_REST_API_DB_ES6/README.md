
# REST API with Express, MongoDB, and ES6 Modules

## Project Overview

This project is a RESTful API server built using **Express.js**, **MongoDB** (via Mongoose), and **ES6 modules**. It follows a modular and layered architecture pattern to keep the codebase clean, maintainable, and scalable.

Key features:

- User management API with CRUD operations
- Input validation using **Zod**
- Profanity filtering and input sanitation
- Custom middleware for logging, validation, and error handling
- Environment variable configuration with **dotenv**
- MongoDB connection management
- Structured folder layout to separate concerns (controllers, services, repository, schema, validators, middleware, utils, config)

---

## Folder Structure

```planetext
.
├── src
│   ├── config
│   │   ├── dbConfig.js          # MongoDB connection setup
│   │   └── serverConfig.js      # Server port and environment config
│   ├── controllers
│   │   └── userController.js    # Request handlers for user routes
│   ├── middleware
│   │   └── middleware.js        # Custom middleware (logging, validation)
│   ├── repository
│   │   └── userRepository.js    # Database queries and data access layer
│   ├── routes
│   │   └── userRoutes.js        # Express routes for user endpoints
│   ├── schema
│   │   └── userSchema.js        # Mongoose schemas/models
│   ├── services
│   │   └── userService.js       # Business logic layer
│   ├── utils
│   │   ├── logDetails.js        # Logging utilities
│   │   ├── profanityCheck.js    # Profanity filtering functions
│   │   └── responseHelper.js    # Helpers for consistent API responses
│   └── validators
│       ├── userZodSchema.js     # Zod schemas for validation
│       └── zodValidators.js     # Generic zod validation middleware
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Lockfile for dependencies
├── README.md                    # Project documentation (this file)
└── documentation
    └── api_screenshots.md       # API response screenshots and test results
```

---

## Technologies & Dependencies

- **Node.js** (v16+)
- **Express.js** (v5) - web framework
- **MongoDB** & **Mongoose** - database and ODM
- **Zod** - schema validation
- **bad-words** - profanity filter
- **dotenv** - environment variable management
- **nodemon** - development server auto-restart

---

## Setup & Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/ankitNegiDev/REST_FUL_API_USING_NODE_EXPRESS/tree/main/03_REST_API_DB_ES6>
   cd 03_rest_api_db_es6
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI and other environment variables, e.g.:

   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
   ```

4. Start the server in development mode (with auto reload):

   ```bash
   npm run dev
   ```

   Or start normally:

   ```bash
   npm start
   ```

5. Server will run on the configured `PORT` (default is 3000). Use an API client like Postman or cURL to test the endpoints.

---

## API Endpoints Overview

- **GET** `/users` - Get all users
- **GET** `/users/:id` - Get user by ID
- **POST** `/users` - Create a new user
- **PUT** `/users/:id` - Update an existing user
- **DELETE** `/users/:id` - Delete a user

*Note:* The project includes validation for POST and PUT requests to ensure correct data and profanity filtering.

---

## Key Features & Design Decisions

### 1. Modular Architecture

- **Routing** handles HTTP route definitions and applies validation middleware.  
- **Validators** leverage Zod schemas for clean and consistent input validation.  
- **Controllers** handle the request/response lifecycle and coordinate between services and routing.  
- **Services** contain business logic and rules, managing data flow between controllers and repository.  
- **Repository** abstracts database queries and data persistence.  
- **Schema** contains Mongoose models defining the database structure.  
- **Middleware** handles cross-cutting concerns such as logging, validation, and error handling.  
- **Utils** hold reusable helpers for logging, response formatting, and profanity checking.

### 2. Validation with Zod

- Schema-based validation for request bodies.
- Middleware automatically validates and returns descriptive errors.

### 3. Profanity Filtering

- Using `bad-words` package with custom helpers to sanitize user input.

### 4. Custom Middleware

- Request logging middleware logs request details (method, URL, status, duration).
- Route-specific validation middleware to keep validation concerns isolated.

### 5. Environment Configuration

- `.env` file for managing sensitive data and port configuration.

---

## How to Contribute

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

---

## Contact

For questions, feedback, or support, please contact:

- Your Name / Team
- Email: <ankitnegi9104@gmail.com>
- GitHub: [my-github-profile](https://github.com/ankitNegiDev)

---

## License

This project is licensed under the ISC License.

---

## Screenshots & API Results

See the `documentation/api_screenshots.md` file for detailed screenshots of API responses and tests.

---

Thank you for using this project! 🚀
