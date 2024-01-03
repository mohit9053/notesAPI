# Simple Note-Taking API

A RESTful API for a simple note-taking application using Node.js and Express.js, with MongoDBas the database. The API should allow users to create, retrieve, update, and delete text notes


## Getting Started

These instructions will guide you through setting up the project on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation
Follow these steps to get your development environment running:

1. _Clone the Repository_

```bash

    git clone ______
    cd notesAPI

```
2. _Backend Setup_

   Navigate to the server directory and install dependencies.

   ```bash
    npm install
   ```

   Start the backend server.

   ```bash
    npm run start
   ```

   The server should now be running on `http://localhost:3000`.


### Configuration

- Configure your database connection and other environment variables by creating a .env file.
- Update the .env file with your MongoDB URI and other necessary configurations.
- Example :
  ```.env
    PORT=3000
    MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.inyacz5.mongodb.net/?retryWrites=true&w=majority"
    SECRET_KEY="<randomString>"
  ```

## Features

- User Authentication and Authorization
- Error Handling
- Data Validation



<!-- API DOCUMENTATION -->
## Authentication API

### User Registration

- **Endpoint:** `POST /api/auth/signup`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - Status Code: 201 Created
  - Body: json object of message saying "User registered successfull"


### User Login

- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - Status Code: 200 OK
  - Body: json object of token

### Create Notes

- **Endpoint:** `POST /api/notes`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```
- **Response:**
  - Status Code: 200 Created
  - Body: Note Object

 
### Get all Notes

- **Endpoint:** `GET /api/notes`
- **Authentication:** Required
- **Response:**
  - Status Code: 200 OK
  - Body: Array of Notes object


### Get note with ID

- **Endpoint:** `GET /api/notes/:id`
- **Authentication:** Required
- **Response:**
  - Status Code: 200 OK
  - Body: Note object


### Update Note

- **Endpoint:** `PUT /api/notes/:id`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```
- **Response:**
  - Status Code: 200 OK
  - Body: Updated Note Object


### Delete Note

- **Endpoint:** `DEL /api/notes/:id`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```
- **Response:**
  - Status Code: 200 OK
  - Body: message saying "Note deleted"



 *THANK YOU*