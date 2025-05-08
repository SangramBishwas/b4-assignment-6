# 🛒 [AS Mart Backend](https://as-mart-backend.vercel.app/)

AS Mart is the backend system for a SecondHand Marketplace web application that allows users to buy and sell used items securely. This repository contains the Express.js RESTful API built with TypeScript and MongoDB.

---

## 🚀 Features

* ✅ User registration and authentication (JWT)
* 🔐 Password hashing with bcrypt
* 🛍️ CRUD operations for product listings
* 👥 Role-based access (Admin/User)
* 📂 Modular and scalable codebase

---

## 🧩 Project Structure

```bash
/src
├── app/             # Core application logic (controllers, services)
├── builder/         # Custom response builders
├── config/          # Configuration files (env, db)
├── errors/          # Custom error classes and handling
├── interface/       # TypeScript interfaces for types and models
├── middleware/      # Express middlewares (auth, errorHandler, etc.)
├── module/          # Domain logic organized into modules (user, listing, etc.)
├── routes/          # API route definitions
├── utils/           # Utility functions (e.g., token generation)
├── app.ts           # Express app setup
└── server.ts        # Entry point – starts the server
```

---

## ⚙️ Tech Stack

* **Node.js** with **Express.js**
* **TypeScript**
* **MongoDB** with **Mongoose**
* **JWT** (JSON Web Token) for authentication
* **bcrypt** for password hashing
* **Zod** for schema validation

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/SangramBishwas/b4-assignment-6/tree/Shuvo/Backend
cd Backend

# Install dependencies
npm i

# Add environment variables
.env
# Fill in your MongoDB URI, JWT secret, etc.

# Start the server
npm run dev
```

---

## 🔐 API Authentication

All protected routes require a valid JWT token in the `Authorization` header:

```
Authorization: token_here
```

---

## 📬 Available API Routes

### 🔐 Auth Routes

* `POST /auth/register` – Register a new user
* `POST /auth/login` – Log in a user
* `POST /auth/logout` – Log out the current user
* `POST /auth/refresh-token` – Refresh JWT token

---

### 🏷️ Category Routes

* `GET /categories` – Get all categories
* `POST /categories` – Create a new category (Authenticated, `User`)
* `DELETE /categories/:id` – Delete a category (Authenticated, `User`)

---

### 📦 Listing Routes

* `GET /listings` – Get all listings
* `GET /listings/:id` – Get a single listing by ID
* `POST /listings` – Create a listing (Authenticated, `User`)
* `PUT /listings/:id` – Update a listing (Authenticated, `User`)
* `PATCH /listings/:id/status` – Update listing status (Authenticated, `User`)
* `DELETE /listings/:id` – Delete a listing

---

### 👤 User Routes

* `GET /users/:id` – Get the profile of a user (Authenticated, `User`)
* `PUT /users/:id` – Update user profile (Authenticated, `User`)
* `DELETE /users/:id` – Delete user account (Authenticated, `User`)

---

### 💖 Wishlist Routes

* `POST /wishlist` – Add item to wishlist (Authenticated, `User`)
* `GET /wishlist` – Get current user's wishlist (Authenticated, `User`)
* `DELETE /wishlist/:id` – Remove item from wishlist (Authenticated, `User`)

---

## 📂 Deployment

Deployed on platforms like **Vercel**, **Railway**, or **Render**. Make sure your `.env` is configured properly before deploying.