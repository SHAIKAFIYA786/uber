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
