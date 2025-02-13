# MERN App with Docker

This is a simple MERN (MongoDB, Express, React, Node.js) application set up with Docker. The app demonstrates how to build and run a full-stack application using Docker containers, with separate services for MongoDB, the backend API, and the frontend.

## Features

- **Backend**: Express server that interacts with MongoDB, exposing RESTful APIs to manage items.
- **Frontend**: React application that communicates with the backend to display and add items.
- **MongoDB**: NoSQL database to store items.

## Docker Setup

### Prerequisites

Ensure you have Docker and Docker Compose installed on your machine.

- [Install Docker](https://docs.docker.com/get-docker/)

### 1. Create a Docker Network

Before starting the containers, create a custom Docker network for communication between the containers:

```bash
docker network create mern_network
```

### 2. Build Docker Images

Build the Docker images for each part of the MERN stack.

- **MongoDB**:

```bash
mdkir database;
cd database;
docker build -t my-database:1.0 .
```

- **Backend**:

```bash
mkdir backend;
cd backend;
docker build -t my-backend:1.0 .
```

- **Frontend**:

```bash
mkdir frontend;
cd frontend;
docker build -t my-frontend:1.0 .
```

### 3. Run MongoDB Container

Run the MongoDB container with the following command:

```bash
docker run -d --name database --network mern_network -p 27017:27017 my-database:1.0
```

### 4. Run Backend Container

Run the backend container, connecting it to the MongoDB container:

```bash
docker run -d --name backend --network mern_network -p 5000:5000 my-backend:1.0
```

### 5. Run Frontend Container

Finally, run the frontend container:

```bash
docker run -d --name frontend --network mern_network -p 5173:5173 my-frontend:1.0
```

### 6. Access the Application

- The **frontend** can be accessed at `http://localhost:5173`.
- The **backend API** is available at `http://localhost:5000`.
- MongoDB is running on port `27017`.

### Development

To make changes to the app:

1. **Frontend**: Modify files in `frontend/` directory.
2. **Backend**: Modify files in `backend/` directory.
3. **MongoDB**: Data is stored in a containerized MongoDB instance.

After making changes, rebuild the Docker images and restart the containers as needed.

### Cleanup

To stop and remove the containers:

```bash
docker stop frontend backend mongodb
docker rm frontend backend mongodb
```

To remove the Docker network:

```bash
docker network rm mern_network
```

## License

MIT License
