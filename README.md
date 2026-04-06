# User Management System – Multi-Page Dynamic Web Application

## Project Description
This project is a multi-page dynamic web application developed using HTML, CSS, React, Node.js, and Express. The application allows users to add user details and retrieve user information using a User ID. The data is stored in JSON files, simulating relational database storage.

The application consists of a frontend built with React and a backend built with Node.js and Express. React Router is used for page navigation, and JSON files are used for storing user data.

---

## Features
- Multi-page navigation using React Router
- Add User details
- Fetch User details using User ID
- Backend server using Node.js and Express
- Data stored in JSON files
- Responsive UI using CSS

---

## Technologies Used

### Frontend
- HTML
- CSS
- React
- React Router

### Backend
- Node.js
- Express.js

### Data Storage
- users.json
- details.json

---

## How the Application Works
1. The Home Page contains navigation buttons to Add User and View User.
2. The Add User page allows the user to enter User ID, Name, Age, and Address.
3. On form submission:
   - User ID and Name are stored in **users.json**
   - User ID, Age, and Address are stored in **details.json**
4. The View User page allows the user to enter a User ID.
5. The backend fetches data from both JSON files and displays Name, Age, and Address.

---
