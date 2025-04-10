# React + Flask Assessment App

## Overview

This is a full-stack web application built using **React.js** for the frontend and **Flask** for the backend.

The application consists of two main pages:

1. **Login/Register Page**
   - Users can register a new account or log in with existing credentials.
   - Form validation is managed using `react-hook-form`.

2. **Main Table Page**
   - Displays a table with three dynamic columns:
     - **First Column:** A numeric input field.
     - **Second Column:** A dropdown populated with numbers from the database.
     - **Third Column:** A real-time percentage calculator based on the input and selected value.

---

## Frontend Tech Stack

- **React.js** – Frontend framework
- **React Router DOM** – Handles page routing (login/register & table page)
- **Axios** – For making HTTP requests to the Flask backend
- **React Hook Form** – Simplifies form handling and validation
- **Material UI (MUI)** – UI components like buttons and inputs
- **Tailwind CSS** – Utility-first CSS framework for styling
- **React Hot Toast / Toaster** – For displaying notifications (success, error, etc.)

---

## Test Account Credentials

You can use the following credentials to log in without registering:
Email: test5@email.com
Password: 1234567890
---

## How to Run

1. **Frontend**
   ```bash
   cd frontend
   npm install
   npm start
2. **Backend**
    cd backend
    pip install -r requirements.txt
    flask run