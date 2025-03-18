# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user in the system. It accepts user details and creates a new user record in the database.

### Method
`POST`

### Status Codes
- **201 Created**: User successfully registered.
- **400 Bad Request**: Missing required fields or invalid input.
- **500 Internal Server Error**: Server encountered an error while processing the request.

### Required Data
The following fields must be provided in the request body (JSON format):
- `firstname` (string, required): The first name of the user.
- `lastname` (string, optional): The last name of the user.
- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user account.

### Example Request Body
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

### Example Response
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

## Endpoint: `/users/login`

### Description
This endpoint is used to authenticate a user. It accepts login credentials and returns a token if the credentials are valid.

### Method
`POST`

### Status Codes
- **200 OK**: Login successful.
- **400 Bad Request**: Missing required fields or invalid input.
- **401 Unauthorized**: Invalid email or password.
- **500 Internal Server Error**: Server encountered an error while processing the request.

### Required Data
The following fields must be provided in the request body (JSON format):
- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user account.

### Example Request Body
```json
{
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

### Example Response
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
