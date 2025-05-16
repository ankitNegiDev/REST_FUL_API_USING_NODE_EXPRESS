# API Test Results Document

## [API Test Results Document Link](./src/assets/document%20node_js.pdf)

## GET Request: Fetching All Users

### (1) When API URL is `http://localhost:port/user`

- **Scenario:** API URL does **not** start with `/users`.
- **Expected:** Server returns an error due to invalid endpoint.
- **Actual:** Error thrown.
- **HTTP Status:** 404 Not Found  
- ![Error Occurred](./src/assets/get%20request%20invlid%20api%20url%20not%20started%20with%20ursers.png)

---

### (2) When API URL is `http://localhost:port/users`

- **Scenario:** API URL is valid and starts with `/users`.
- **Expected:** Returns the list of all users.
- **Actual:** Successful response with user data.
- **HTTP Status:** 200 OK  
- ![Valid URL](./src/assets/get%20request%20when%20correct%20url%20is%20passed.png)

---

## GET Request: Fetching Single User Data

### (1) When API URL is `http://localhost:port/users/invalidId`

- **Scenario:** The user ID in the URL is invalid.
- **Expected:** Server returns an error indicating invalid ID.
- **Actual:** Error thrown.
- **HTTP Status:** 400 Bad Request / 404 Not Found (based on implementation)  
- ![Invalid ID](./src/assets/get%20request%20with%20invalid%20id.png)

---

### (2) When API URL is `http://localhost:port/users/validId`

- **Scenario:** The user ID is valid.
- **Expected:** Returns the user data corresponding to the valid ID.
- **Actual:** Successful response with user data.
- **HTTP Status:** 200 OK  
- ![Valid ID](./src/assets/get%20request%20wit%20hvalid%20id.png)

---

## POST Request: Creating a User

### (1) When API URL is `http://localhost:port/users` — No request body provided

- **Scenario:** No request body sent.
- **Expected:** Server throws an error indicating missing request body.
- **Actual:** Error thrown.
- **HTTP Status:** 400 Bad Request  
- ![No Request Body Provided](./src/assets/no%20request%20body%20is%20provided.png)

---

### (2) When API URL is `http://localhost:port/users` — Some fields in the request body are empty

- **Scenario:** Request body is provided but some required fields are empty.
- **Expected:** Server returns an error indicating validation failure.
- **Actual:** Error thrown.
- **HTTP Status:** 400 Bad Request  
- ![Empty Fields](./src/assets/when%20empty%20fields%20are%20passed%20in%20post.png)

---

### (3) When API URL is `http://localhost:port/users` — Some bad words are passed in request body

- **Scenario:** Request body contains inappropriate or bad words.
- **Expected:** Server rejects input with an error related to content policy.
- **Actual:** Error thrown.
- **HTTP Status:** 400 Bad Request  
- ![Bad Words Passed](./src/assets/some%20bad%20word%20passed.png)

---

### (4) When API URL is `http://localhost:port/users` — Invalid fields passed in request body

- **Scenario:** Request body contains fields that are not allowed, e.g., user tries to set the ID manually.
- **Expected:** Server ignores or throws error for invalid fields.
- **Actual:** Error thrown or invalid fields ignored.
- **HTTP Status:** 400 Bad Request  
- ![Invalid Fields](./src/assets/passing%20invalid%20fields.png)

---

### (5) When API URL is `http://localhost:port/users` — Correct fields passed

- **Scenario:** Request body contains all required fields correctly.
- **Expected:** User is created successfully.
- **Actual:** Success response.
- **HTTP Status:** 201 Created  
- ![Correct Fields](./src/assets/passing%20the%20correct%20fields.png)

---

## DELETE Request: Deleting a User

### (1) When API URL is `http://localhost:port/users/id` — Invalid ID passed

- **Scenario:** ID provided does not exist or is invalid.
- **Expected:** Server returns error for invalid ID.
- **Actual:** Error thrown.
- **HTTP Status:** 404 Not Found  
- ![Invalid ID Delete](./src/assets/passing%20the%20invalid%20id%20in%20delete%20request.png)

---

### (2) When API URL is `http://localhost:port/users/id` — Valid ID passed

- **Scenario:** Valid user ID provided.
- **Expected:** User is deleted successfully.
- **Actual:** Success response.
- **HTTP Status:** 200 OK  
- ![Valid ID Delete](./src/assets/passing%20valid%20id%20in%20delete%20request.png)

---

### (3) When API URL is `http://localhost:port/users/id` — Deleting a user already deleted

- **Scenario:** Attempting to delete a user that was already deleted.
- **Expected:** Server returns error indicating user not found.
- **Actual:** Error thrown.
- **HTTP Status:** 404 Not Found  
- ![Double Delete](./src/assets/double%20delete.png)

---

## PUT Request: Updating Existing User

### (1) When API URL is `http://localhost:port/users/id` — Invalid ID passed by user

- **Scenario:** User ID is invalid.
- **Expected:** Server returns error indicating invalid ID.
- **Actual:** Error thrown.
- **HTTP Status:** 400 Bad Request / 404 Not Found  
- ![Invalid ID PUT](./src/assets/invalid%20id%20in%20put.png)

---

### (2) When API URL is `http://localhost:port/users/id` — Valid ID but no request body passed

- **Scenario:** No request body sent with the update.
- **Expected:** Server returns error for missing update data.
- **Actual:** Error thrown.
- **HTTP Status:** 400 Bad Request  
- ![Empty Body PUT](./src/assets/empty%20body%20put.png)

---

### (3) When API URL is `http://localhost:port/users/id` — Valid ID but some fields are empty

- **Scenario:** Request body has some empty fields.
- **Expected:** Server returns validation error.
- **Actual:** Error thrown.
- **HTTP Status:** 400 Bad Request  
- ![Empty Fields PUT](./src/assets/empty%20fields%20in%20put.png)

---

### (4) When API URL is `http://localhost:port/users/id` — Valid ID but some fields contain bad words

- **Scenario:** Request body contains inappropriate content.
- **Expected:** Server rejects update due to bad content.
- **Actual:** Error thrown.
- **HTTP Status:** 400 Bad Request  
- ![Bad Words PUT](./src/assets/bad%20wors%20in%20put.png)

---

### (5) When API URL is `http://localhost:port/users/id` — Valid ID but extra invalid fields included

- **Scenario:** Request body contains fields not allowed to be updated.
- **Expected:** Server ignores or throws error for invalid fields.
- **Actual:** Error thrown or ignored.
- **HTTP Status:** 400 Bad Request  
- ![Invalid Fields PUT](./src/assets/invalids%20fields.png)

---

### (6) When API URL is `http://localhost:port/users/id` — Valid ID and valid request body

- **Scenario:** All fields are valid and allowed.
- **Expected:** User updated successfully.
- **Actual:** Success response.
- **HTTP Status:** 200 OK  
- ![Update Successful](./src/assets/update%20sucessfuly.png)
