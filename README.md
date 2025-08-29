# Smartty - IoT Device Management Dashboard


## About The Project

Smartty is a full-stack web application that provides a central dashboard for registering and managing all your connected IoT devices. Built with React, Node.js, and MySQL, it features a beautiful landing page, device registration with image uploads, email confirmations, and full CRUD (Create, Read, Update, Delete) functionality.

This project was built to demonstrate a complete full-stack development cycle, from database design to frontend UI implementation and API integration.

---

## Features

-   **Device Registration:** Add new devices with details like name, type, location, owner's email, and a custom image.
-   **Email Confirmation:** Receive an email notification via Nodemailer upon successful device registration.
-   **Central Dashboard:** View all your registered devices in a clean, responsive grid layout.
-   **Status Indicators:** See the status of each device (Online, Offline, Error) at a glance.
-   **Full CRUD Functionality:** Create, read, update, and delete device information seamlessly through a RESTful API.
-   **Static Asset Serving:** Includes a landing page with video, audio, and image assets.
-   **Responsive Design:** A beautiful and functional interface on both desktop and mobile, built with Tailwind CSS.

---

## Technology Stack

*   **Frontend:**
    *   [React.js](https://reactjs.org/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Axios](https://axios-http.com/)
*   **Backend:**
    *   [Node.js](https://nodejs.org/)
    *   [Express.js](https://expressjs.com/)
    *   [MySQL2](https://github.com/sidorares/node-mysql2)
*   **Database:**
    *   [MySQL](https://www.mysql.com/)
*   **Other Tools:**
    *   [Multer](https://github.com/expressjs/multer) for file uploads.
    *   [Nodemailer](https://nodemailer.com/) for sending emails.
    *   [Nodemon](https://nodemon.io/) for server auto-restarts.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/en/download/) (v18 or v20 recommended)
*   [NPM](https://www.npmjs.com/get-npm)
*   [MySQL Server](https://dev.mysql.com/downloads/mysql/)
*   [Git](https://git-scm.com/downloads)

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/SlavenDerickPais/smartty-iot-dashboard.git
cd smartty-iot-dashboard
```

#### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Set up the MySQL database
# 1. Log in to your MySQL server and run the following commands:
CREATE DATABASE smartty_db;
USE smartty_db;
CREATE TABLE devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    status ENUM('Online', 'Offline', 'Error') DEFAULT 'Offline',
    owner_email VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


# Create a .env file in the backend/ directory and add your credentials
# (Replace with your actual data)
touch .env
```
Now, add the following to your `backend/.env` file:
```
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smartty_db

# Nodemailer Configuration (use a Google App Password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_google_app_password 
```

```bash
# Start the backend server (runs on http://localhost:5000)
npm start
```

#### 3. Frontend Setup

```bash
# Open a NEW terminal window and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server (runs on http://localhost:3000)
npm start
```
Your application should now be running and accessible at **`http://localhost:3000`**.

---

## API Endpoints

The backend provides the following REST API endpoints. You can test them with tools like [Postman](https://www.postman.com/) or the Thunder Client VS Code extension.

Base URL: `http://localhost:5000/api/devices`

| Method | Endpoint | Description | Body (multipart/form-data) |
| :--- | :--- |:---|:---|
| `GET` | `/` | Fetches all registered devices. | - |
| `POST`| `/` | Registers a new device. | `name`, `type`, `location`, `owner_email`, `deviceImage` (file) |
| `PUT` | `/:id`| Updates an existing device. | (Same as POST) |
| `DELETE`| `/:id`| Deletes a device. | - |

---

## Author

**Slaven Derick Pais** - [SlavenDerickPais](https://github.com/SlavenDerickPais)
