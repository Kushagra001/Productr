# Productr - Web Application

Productr is a modern web application built with the MERN stack (MongoDB, Express, React, Node.js). It features a secure, OTP-based authentication system and a sleek user interface.

## 📂 Project Structure

-   **`client/`**: React frontend application (Vite + Tailwind CSS).
-   **`server/`**: Node.js/Express backend API.

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   MongoDB Atlas Account (for database)

### 1. Backend Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    -   Create a `.env` file in the root of the project.
    -   Add the following variables:
        ```env
        MONGODB_URI=your_mongodb_connection_string
        SMTP_USER=your_email@gmail.com
        SMTP_PASS=your_email_app_password
        PORT=5000
        ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    The server will run on `http://localhost:5000`.

### 2. Frontend Setup

1.  Open a new terminal and navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## 🛠️ Environment Variables

| Variable | Description |
| :--- | :--- |
| `MONGODB_URI` | Connection string for your MongoDB database. |
| `SMTP_USER` | Email address used for sending OTPs (e.g., Gmail). |
| `SMTP_PASS` | App Password for the email account (NOT your login password). |
| `PORT` | (Optional) Port for the backend server. Defaults to 5000. |

## ✨ Features

-   **Authentication**: Secure Email OTP-based Login and Signup.
-   **User Profile**: Dynamic avatar and username display based on email.
-   **Responsive Design**: Modern UI with Tailwind CSS.
