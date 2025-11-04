# 🚀 MERN Dockerized Boilerplate Stack

## A **MERN** (MongoDB, Express, React, Node.js) stack boilerplate fully containerized with **Docker** and **Docker Compose**. Start development with a single command!

---

## ✨ Quick Setup

### Prerequisites
* **Docker** and **Docker Compose** installed.

### 1. Clone & Navigate
```bash
git clone https://github.com/KnjazMiljan/mern-dockerized-boilerplate-stack.git
cd mern-dockerized-boilerplate-stack
```

### 2. Environment Setup

Create a .env file in the /server directory for backend configuration (e.g., MONGO_URI=mongodb://mongo:27017/mern_db).

### 3. Build & Run (Single Command)

Build images and start all services (Client, Server, MongoDB) in detached mode:

```bash
docker compose up -d --build
```


    Note: The -d flag runs containers in the background, and --build ensures your latest code is compiled into the images.

## 🌐 Access & Development

This setup provides hot reloading for both your React frontend and Node/Express backend, making the development loop efficient.
Component	Access URL	Notes:

#### Frontend (React)	http://localhost:5173	Front-end application
#### Backend (Express API)	http://localhost:5000	REST API endpoints

### Stop Containers

When development is complete, stop and remove all running services:

```bash
docker-compose down
```
