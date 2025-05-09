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

## 🗺️ Maps API Documentation

This file documents two core GET endpoints for fetching **coordinates** and **distance/time** using optional Google Maps API support.

## 🗺️ Maps API Route Documentation

---

### 📍 `GET /get-coordinates`

**Description:** Fetches the latitude and longitude of a given address.

#### 🔐 Auth Required:
Yes — Bearer Token in `Authorization` header.

#### 📝 Query Parameters:
| Parameter | Type   | Required | Description             |
|-----------|--------|----------|-------------------------|
| address   | string | Yes      | Location to be geocoded |

#### ✅ Success Response:
```json
{
  "lat": 12.9716,
  "lng": 77.5946,
  "default": true,
  "message": "API key was empty. Returned default coordinates for testing."
}
```

#### ❌ Error Response:
```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid value",
      "path": "address",
      "location": "query"
    }
  ]
}
```

---

### 🚗 `GET /get-distance-time`

**Description:** Fetches distance and travel time between two locations.

#### 🔐 Auth Required:
Yes — Bearer Token in `Authorization` header.

#### 📝 Query Parameters:
| Parameter    | Type   | Required | Description                  |
|--------------|--------|----------|------------------------------|
| origin       | string | Yes      | Starting point               |
| destination  | string | Yes      | Ending point                 |

#### ✅ Success Response:
```json
{
  "distance": "10.2 km",
  "duration": "25 mins"
}
```

#### ❌ Error Response:
```json
{
  "message": "Unable to fetch distance and time"
}
```

---

> ℹ️ **Note:** Replace `localhost:4000` with your actual backend URL when making requests from the client or Postman.

---



## 🧭 GET `/get-coordinates`

### 📌 Description:
This endpoint fetches the **latitude and longitude (geographic coordinates)** for a given place string using the **Google Geocoding API**.

---

### 🔐 Authentication:
Protected route – requires valid token via `authMiddleware`.

---

### 📥 Query Parameters:

| Name   | Type   | Required | Description                                   |
|--------|--------|----------|-----------------------------------------------|
| place  | string | Yes      | The name or address of the place to locate.   |

---

### ✅ Validation:
- `place` must be a non-empty string.
- Validated using `express-validator`.

---

### 🧠 Logic:
- The controller calls `mapsService.getCoordinates(place)`.
- That service hits the Google Geocoding API.
- Returns coordinates if found.

---

### 📤 Response (Success - 200):

```json
{
  "lat": 48.8566,
  "lng": 2.3522
}


http://localhost:4000/maps/get-suggestions?input=Chennai
[
    {
        "type": "Feature",
        "properties": {
            "datasource": {
                "sourcename": "openstreetmap",
                "attribution": "© OpenStreetMap contributors",
                "license": "Open Database License",
                "url": "https://www.openstreetmap.org/copyright"
            },
            "old_name": "Madras",
            "country": "India",
            "country_code": "in",
            "state": "Tamil Nadu",
            "county": "Chennai",
            "city": "Chennai",
            "postcode": "600001",
            "iso3166_2": "IN-TN",
            "lon": 80.270186,
            "lat": 13.0836939,
            "state_code": "TN",
            "result_type": "postcode",
            "formatted": "Chennai, TN, India",
            "address_line1": "Chennai",
            "address_line2": "TN, India",
            "category": "populated_place",
            "timezone": {
                "name": "Asia/Kolkata",
                "offset_STD": "+05:30",
                "offset_STD_seconds": 19800,
                "offset_DST": "+05:30",
                "offset_DST_seconds": 19800,
                "abbreviation_STD": "IST",
                "abbreviation_DST": "IST"
            },
            "plus_code": "7M5237MC+F3",
            "plus_code_short": "MC+F3 Chennai, India",
            "rank": {
                "importance": 0.6280422595919259,
                "confidence": 1,
                "confidence_city_level": 1,
                "match_type": "full_match"
            },
            "place_id": "51927538ba4a11544059d8bf46edd92a2a40f00103f901e4acb9c000000000c002079203093630303030312b696e"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                80.270186,
                13.0836939
            ]
        },
        "bbox": [
            80.110186,
            12.9236939,
            80.430186,
            13.2436939
        ]
    },
    {
        "type": "Feature",
        "properties": {
            "datasource": {
                "sourcename": "openstreetmap",
                "attribution": "© OpenStreetMap contributors",
                "license": "Open Database License",
                "url": "https://www.openstreetmap.org/copyright"
            },
            "country": "India",
            "country_code": "in",
            "state": "Tamil Nadu",
            "county": "Chennai",
            "iso3166_2": "IN-TN",
            "lon": 80.20230352827184,
            "lat": 13.000841300000001,
            "state_code": "TN",
            "result_type": "county",
            "formatted": "Chennai, India",
            "address_line1": "Chennai",
            "address_line2": "India",
            "category": "administrative",
            "timezone": {
                "name": "Asia/Kolkata",
                "offset_STD": "+05:30",
                "offset_STD_seconds": 19800,
                "offset_DST": "+05:30",
                "offset_DST_seconds": 19800,
                "abbreviation_STD": "IST",
                "abbreviation_DST": "IST"
            },
            "plus_code": "7M522622+8W",
            "rank": {
                "importance": 0.4768878569361357,
                "confidence": 1,
                "match_type": "full_match"
            },
            "place_id": "51c0727f8af20c544059e6f857456e002a40f00101f901a1b5780000000000c00209"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                80.20230352827184,
                13.000841300000001
            ]
        },
        "bbox": [
            80.1182821,
            12.8514482,
            80.3069299,
            13.1502817
        ]
    },
    {
        "type": "Feature",
        "properties": {
            "datasource": {
                "sourcename": "openstreetmap",
                "attribution": "© OpenStreetMap contributors",
                "license": "Open Database License",
                "url": "https://www.openstreetmap.org/copyright"
            },
            "country": "India",
            "country_code": "in",
            "state": "Telangana",
            "county": "Shankarampet_R mandal",
            "state_district": "Medak",
            "city": "Chennaipally",
            "postcode": "502248",
            "iso3166_2": "IN-TS",
            "lon": 78.3926264,
            "lat": 18.0311127,
            "state_code": "TG",
            "result_type": "postcode",
            "formatted": "Chennaipally, TG, India",
            "address_line1": "Chennaipally",
            "address_line2": "TG, India",
            "category": "populated_place",
            "timezone": {
                "name": "Asia/Kolkata",
                "offset_STD": "+05:30",
                "offset_STD_seconds": 19800,
                "offset_DST": "+05:30",
                "offset_DST_seconds": 19800,
                "abbreviation_STD": "IST",
                "abbreviation_DST": "IST"
            },
            "plus_code": "7JCW29JV+C3",
            "rank": {
                "importance": 0.14667666666666662,
                "confidence": 1,
                "confidence_city_level": 1,
                "match_type": "full_match"
            },
            "place_id": "51f5e27aca209953405982fd7c00f7073240f00103f901e0615b6f01000000c002079203093530323234382b696e"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                78.3926264,
                18.0311127
            ]
        },
        "bbox": [
            78.3726264,
            18.0111127,
            78.4126264,
            18.0511127
        ]
    },
    {
        "type": "Feature",
        "properties": {
            "datasource": {
                "sourcename": "openstreetmap",
                "attribution": "© OpenStreetMap contributors",
                "license": "Open Database License",
                "url": "https://www.openstreetmap.org/copyright"
            },
            "country": "India",
            "country_code": "in",
            "state": "Telangana",
            "county": "Tripuraram mandal",
            "state_district": "Nalgonda",
            "city": "Chennaipalem",
            "iso3166_2": "IN-TS",
            "lon": 79.4987159,
            "lat": 16.7876351,
            "state_code": "TG",
            "result_type": "city",
            "formatted": "Chennaipalem, TG, India",
            "address_line1": "Chennaipalem",
            "address_line2": "TG, India",
            "category": "populated_place",
            "timezone": {
                "name": "Asia/Kolkata",
                "offset_STD": "+05:30",
                "offset_STD_seconds": 19800,
                "offset_DST": "+05:30",
                "offset_DST_seconds": 19800,
                "abbreviation_STD": "IST",
                "abbreviation_DST": "IST"
            },
            "plus_code": "7J8XQFQX+3F",
            "rank": {
                "importance": 0.14667666666666662,
                "confidence": 1,
                "confidence_city_level": 1,
                "match_type": "full_match"
            },
            "place_id": "51b11f18f6eadf53405983ae3374a2c93040f00103f90160a4048801000000c00208"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                79.4987159,
                16.7876351
            ]
        },
        "bbox": [
            79.4787159,
            16.7676351,
            79.5187159,
            16.8076351
        ]
    },
    {
        "type": "Feature",
        "properties": {
            "datasource": {
                "sourcename": "openstreetmap",
                "attribution": "© OpenStreetMap contributors",
                "license": "Open Database License",
                "url": "https://www.openstreetmap.org/copyright"
            },
            "country": "India",
            "country_code": "in",
            "state": "Andhra Pradesh",
            "county": "Bandi Atmakur",
            "state_district": "Nandyal",
            "city": "Gali Chennaiah Palem",
            "iso3166_2": "IN-AP",
            "lon": 78.5840007,
            "lat": 15.6155348,
            "state_code": "AP",
            "result_type": "city",
            "formatted": "Gali Chennaiah Palem, AP, India",
            "address_line1": "Gali Chennaiah Palem",
            "address_line2": "AP, India",
            "category": "populated_place",
            "timezone": {
                "name": "Asia/Kolkata",
                "offset_STD": "+05:30",
                "offset_STD_seconds": 19800,
                "offset_DST": "+05:30",
                "offset_DST_seconds": 19800,
                "abbreviation_STD": "IST",
                "abbreviation_DST": "IST"
            },
            "plus_code": "7J7WJH8M+6J",
            "rank": {
                "importance": 0.14667666666666662,
                "confidence": 1,
                "confidence_city_level": 1,
                "match_type": "full_match"
            },
            "place_id": "51d5d5784460a55340598d199760273b2f40f00103f901e9d89bbc01000000c00208"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                78.5840007,
                15.6155348
            ]
        },
        "bbox": [
            78.5640007,
            15.5955348,
            78.6040007,
            15.6355348
        ]
    }
]
http://localhost:4000/maps/ /get-suggestions?origin=Chennai&destination=Delhi


services:
  # Backend service
  - type: web
    name: backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    repo: https://github.com/SHAIKAFIYA786/uber/tree/main/Backend  # Your backend GitHub repo URL
    branch: main
    envVars:
      - key: PORT
        value: "4000"  # Ensure that the backend listens on the correct port
      - key: NODE_ENV
        value: "production"
      - key: PROD_DB_URI
        value: "mongodb+srv://shaikafiya9676:ckI8vuBWZLxeDcww@cluster0.b7spkjs.mongodb.net/uber?retryWrites=true&w=majority&appName=Cluster0"  # MongoDB Atlas URI
      - key: JWT_SECRET
        value: "uberpractise"
      - key: GOOGLE_MAPS_API
        value: ""  # Leave empty if you don't have the key
      - key: GEOAPIFY_API_KEY
        value: "b272528f7a5144aa97a5fbf351cc726e"

  # Frontend service
  - type: web
    name: frontend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    repo: https://github.com/SHAIKAFIYA786/uber/tree/main/Frontend  # Your frontend GitHub repo URL
    branch: main
    envVars:
      - key: VITE_BASE_URL
        value: "https://uber.onrender.com"  # Backend URL on Render
      - key: REACT_APP_API_URL
        value: "https://uber.onrender.com"  # Frontend URL on Render

