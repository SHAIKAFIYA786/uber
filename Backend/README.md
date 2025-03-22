# API Documentation

---

## **Endpoint: `/users/register`**

### **Description**
This endpoint is used to register a new user in the system. It accepts user details and creates a new user record in the database.

### **Method**
`POST`

### **Status Codes**
- **201 Created**: User successfully registered.
- **400 Bad Request**: Missing required fields or invalid input.
- **500 Internal Server Error**: Server encountered an error while processing the request.

### **Required Data**
The following fields must be provided in the request body (JSON format):
- **`firstname`** (string, required): The first name of the user.
- **`lastname`** (string, optional): The last name of the user.
- **`email`** (string, required): The email address of the user.
- **`password`** (string, required): The password for the user account.

### **Example Request Body**
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

### **Example Response**
```json
{
    "id": "12345",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com"
}
```

---

## **Endpoint: `/users/login`**

### **Description**
This endpoint is used to authenticate a user. It accepts login credentials and returns a token if the credentials are valid.

### **Method**
`POST`

### **Status Codes**
- **200 OK**: Login successful.
- **400 Bad Request**: Missing required fields or invalid input.
- **401 Unauthorized**: Invalid email or password.
- **500 Internal Server Error**: Server encountered an error while processing the request.

### **Required Data**
The following fields must be provided in the request body (JSON format):
- **`email`** (string, required): The email address of the user.
- **`password`** (string, required): The password for the user account.

### **Example Request Body**
```json
{
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

### **Example Response**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Q5OWQ4MmQyODdjZTkyY2NlYjcxYjMiLCJpYXQiOjE3NDIzMTUxMTB9.ML-RSg08w_JOMChgIvh1nqYW3bEHEGwML2xQR3a7uMg",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "_id": "67d99d82d287ce92cceb71b3",
        "email": "priya@example.com",
        "password": "$2b$10$WUlkzw/OejU95e2bxPKVq.Cgrz9dj8ocHvU/rVtI8trwYnaYWqJPS",
        "__v": 0
    }
}
```

---

## **Endpoint: `/users/logout`**

### **Description**
This endpoint is used to log out a user by invalidating their authentication token. The token is added to a blocklist to prevent further use.

### **Method**
`GET`

### **Status Codes**
- **200 OK**: Logout successful.
- **500 Internal Server Error**: Server encountered an error while processing the request.

### **Headers**
- **`Authorization`** (string, required): Bearer token for authentication.

### **Example Request**
```
GET /users/logout HTTP/1.1
Host: example.com
Authorization: Bearer <your-auth-token>
```

### **Example Response**
```json
{
    "message": "Logged out successfully. You can log in again."
}
```

---

# Authentication Middleware Documentation

## **Overview**
This middleware is responsible for extracting the authentication token from **cookies** or the **Authorization header** and allowing the request to proceed only if a valid token is present.

---

## **Middleware Code**
```js
module.exports.authMiddleware = (req, res, next) => {
    console.log("Headers Received:", req.headers); // Debugging: Log all headers

    let token = req.cookies.token; // First, check if the token is in cookies
    console.log("Token from Cookies:", token);
    const auth = req.headers.authorization;
    console.log("headers auth:", auth); // Debugging: Check if token is extracted correctly
    
    if (!token && req.headers.authorization) { // If no token in cookies, check the authorization header
        const authHeader = req.headers.authorization;
        const parts = authHeader.split(" "); // Split the header by space

        if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
            token = parts[1]; // Extract the actual token
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    console.log("Extracted Token:", token); // Debugging: Check if token is extracted correctly
    next();
};
```

---

## **Line-by-Line Explanation**

### **1️⃣ Logging Incoming Headers**
```js
console.log("Headers Received:", req.headers);
```
- **Purpose**: Logs all headers received in the request.
- **Why?**: Helps debug if the `Authorization` header is actually reaching the middleware.

---

### **2️⃣ Checking for Token in Cookies**
```js
let token = req.cookies.token;
console.log("Token from Cookies:", token);
```
- **Purpose**: Tries to retrieve the JWT token from cookies.
- **Why?**: Some applications store tokens in cookies instead of headers (e.g., for frontend authentication).

- **Example (If token is in cookies)**:  
  ```js
  req.cookies = { token: "eyJhbGciOiJIUzI1NiIsIn..." };
  ```
  → The `token` variable will hold that value.

---

### **3️⃣ Checking for Authorization Header**
```js
const auth = req.headers.authorization;
console.log("headers auth:", auth);
```
- **Purpose**: Checks if the request includes an `Authorization` header.
- **Why?**: Some applications send tokens in the `Authorization` header instead of cookies.

- **Example (If token is in header)**:  
  ```js
  req.headers.authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
  ```
  → `auth` will now contain `"Bearer <token>"`.

---

### **4️⃣ Extract Token from Authorization Header (If Not in Cookies)**
```js
if (!token && req.headers.authorization) {
```
- **Purpose**: If no token was found in cookies, check the `Authorization` header.
- **Why?**: Some requests may not include cookies but send the token in headers instead.

---

### **5️⃣ Splitting the Header**
```js
const authHeader = req.headers.authorization;
const parts = authHeader.split(" ");
```
- **Purpose**: Splits the `Authorization` header into parts.
- **Why?**: The header follows this format:  
  ```
  Authorization: Bearer <token>
  ```
  So, when split by `" "`, we get:
  ```js
  parts = ["Bearer", "<actual_token>"];
  ```

---

### **6️⃣ Verifying Token Format**
```js
if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
    token = parts[1];
}
```
- **Purpose**: Ensures the token follows the `"Bearer <token>"` format.
- **Why?**:
  - `parts.length === 2` → Ensures we have exactly two parts.
  - `parts[0].toLowerCase() === "bearer"` → Ensures the first part is `"Bearer"` (case-insensitive).
  - `parts[1]` → Extracts the actual token.

---

### **7️⃣ Handling Missing Token**
```js
if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
}
```
- **Purpose**: If no token is found in **cookies or headers**, return a `401 Unauthorized` response.
- **Why?**: The request must include a valid token to proceed.

- **Example (If no token is provided)**:
  ```json
  {
    "message": "Unauthorized: No token provided"
  }
  ```
  The request is rejected.

---

### **8️⃣ Logging Extracted Token**
```js
console.log("Extracted Token:", token);
```
- **Purpose**: Logs the extracted token for debugging.
- **Why?**: Helps confirm whether the token is being extracted correctly.

---

### **9️⃣ Moving to the Next Middleware**
```js
next();
```
- **Purpose**: Calls the next middleware in the Express.js pipeline.
- **Why?**: If the token is valid, the request proceeds to the next handler (e.g., verifying the token, handling the route).

---

## **🚀 Example Scenarios**

### **✅ Scenario 1: Token in Cookies**
- **Request Headers**:  
  ```
  No Authorization header
  ```
- **Cookies**:  
  ```json
  { "token": "eyJhbGciOiJIUz..." }
  ```
- **Token Extracted From**: **Cookies**
- ✅ Middleware **allows request to continue**.

---

### **✅ Scenario 2: Token in Headers**
- **Request Headers**:
  ```
  Authorization: Bearer eyJhbGciOiJIUz...
  ```
- **Cookies**:
  ```json
  {}
  ```
- **Token Extracted From**: **Authorization Header**
- ✅ Middleware **allows request to continue**.

---

### **❌ Scenario 3: No Token Provided**
- **Request Headers**:
  ```
  No Authorization header
  ```
- **Cookies**:
  ```json
  {}
  ```
- **Token Extracted From**: **None**
- ❌ Middleware **returns 401 Unauthorized**.

---

---

## **Endpoint: `/users/profile`**

### **Description**
This endpoint is used to retrieve the profile of the authenticated user. It requires a valid authentication token.

### **Method**
`GET`

### **Status Codes**
- **200 OK**: Profile retrieved successfully.
- **401 Unauthorized**: Missing or invalid authentication token.
- **500 Internal Server Error**: Server encountered an error while processing the request.

### **Headers**
- **`Authorization`** (string, required): Bearer token for authentication.

### **Example Request**
```
GET /users/profile HTTP/1.1
Host: example.com
KEY VALUE TO CHECK IN THE POSTMAN
Authorization: Bearer <your-auth-token>
```

### **Example Response**
```json
{
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "_id": "67d99d82d287ce92cceb71b3",
        "email": "john.doe@example.com"
    }
}
```

---

## **Blocklist Functionality**

### **Overview**
The blocklist functionality ensures that logged-out tokens cannot be reused for authentication. Tokens added to the blocklist will automatically expire after 24 hours.

### **Schema**
The blocklist schema is defined as follows:
```js
const blocklistSchema = new mongoose.Schema({
    token: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 } // 86400 seconds = 24 hours
});
```
## 🔥 **What is Token Blacklisting, and Why Do We Need It?**
Token blacklisting is a **security measure** used to **invalidate JWT tokens** before they expire. This ensures users who log out or get their tokens revoked **can’t reuse old tokens to access protected routes**.

### **🚑 Problem Without Blacklisting**
- JWT tokens **exist until they expire** (e.g., 1 hour).
- If a user **logs out**, but the token is still valid, they can **continue making requests** using the same token.
- If an **attacker steals a JWT token**, they can **reuse it until it expires**.

---

### **✅ Why is Token Blacklisting Useful?**
1. **Ensures Logged-Out Users Can’t Access Protected Routes**
   - If a user logs out, the token is **blacklisted**, so they need to log in again to get a new token.

2. **Prevents Stolen Tokens from Being Used**
   - If someone **steals a JWT**, we can **revoke it immediately** by adding it to the blacklist.

3. **Improves Security in Role-Based Access Control**
   - If an admin **revokes access** for a user, their old tokens won’t work anymore.

---

## **🔄 How Blacklisting Works**
1. **When a user logs out,** their token is stored in a blacklist.
2. **When a user makes a request,** the system:
   - Checks if the token is in the **blacklist**.
   - If the token **is blacklisted**, the request is **denied**.
   - If the token **is not blacklisted**, the request is **allowed**.

---

## **🛠️ Where to Store Blacklisted Tokens?**
1. **MongoDB (Database-based approach)**
   - Best for apps where users don’t log out frequently.
   - Stored in a collection (`blacklist` table) and removed automatically after expiry.

2. **Redis (In-memory storage)**
   - Best for **fast access** and **large-scale apps**.
   - Blacklisted tokens expire automatically after a set time.

3. **Memory (In-app storage)**
   - Works for small apps but **not recommended for production** (resets when the server restarts).

---

## **🚀 What Happens Without Blacklisting?**
- If a user logs out, their token still **works until expiry**.
- If an attacker gets access to a token, they can **continue using it**.
- Users with revoked access can **still use old tokens**.

---

## **🛡️ When Should You Use Token Blacklisting?**
✔️ In **apps with authentication** where users **log in and out**.  
✔️ If your app **handles sensitive user data**.  
✔️ If you need **session-based security**, but are using JWT instead of sessions.  

---

## **🔥 Final Thoughts**
- **JWT alone** doesn’t provide a way to **force logout** before token expiry.
- **Blacklisting ensures that tokens can’t be used after logout**.
- **It’s critical for security in authentication-based apps.**

👉 **Use token blacklisting if you want a more secure authentication system!** 🚀


```

Captain Registration API Documentation
Endpoint
POST /captains/register

Description
This endpoint allows captains to register by providing their details, including personal information and vehicle details. It follows the same structure as the User Registration API, with additional fields for vehicle information.

Request Body
Send a JSON object with the following structure:

json
Copy
Edit
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Blue",
    "plate": "ABC-1234",
    "capacity": 4,
    "typevehicle": "Sedan"
  }
}
Field Requirements:
Field	Type	Required	Description
fullname.firstname	String	✅	First name (min 3 characters)
fullname.lastname	String	✅	Last name
email	String	✅	Must be a valid email format
password	String	✅	Minimum 6 characters
vehicle.color	String	✅	Color of the vehicle
vehicle.plate	String	✅	Vehicle's plate number
vehicle.capacity	Number	✅	Capacity of the vehicle
vehicle.typevehicle	String	✅	Type of vehicle (e.g., Sedan, SUV)
Response Codes
Status Code	Description
201 Created	Captain registered successfully
400 Bad Request	Validation failed (missing/invalid fields)
500 Internal Server Error	Unexpected server error
Example Success Response
json
Copy
Edit
{
  "message": "Captain registered successfully",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC-1234",
      "capacity": 4,
      "typevehicle": "Sedan"
    }
  }
}
Notes
Passwords are automatically hashed before being stored.

A JWT token may be generated upon successful registration if authentication is required immediately.

This API structure is identical to User Registration with additional vehicle-related fields.

