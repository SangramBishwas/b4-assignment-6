# 🛒 [AS Mart Frontend](https://asmart-project.vercel.app/)

Welcome to the frontend of **AS Mart**, a modern, responsive web application system for a SecondHand Marketplace that allows users to buy and sell used items. This React-based platform (built using **Next.js** and **TypeScript**) focuses on user-friendliness, intuitive UI, and seamless performance.

---

## 🚀 Features

### ✅ General
- Home page with overview of featured or latest items.
- Responsive layout for mobile and desktop.
- Clean and modern user interface with intuitive navigation.

### 👥 User Authentication
- Login via email or phone number and password.
- Secure JWT-based authentication.
- Passwords hashed using bcrypt (handled in backend).

### 📦 Listings
- View all available products with images, prices, and condition.
- Search and filter listings by category, condition, price, and location.
- Mark items as "sold" after successful sales.

### 🧑‍💼 User Dashboard
- Post new items for sale with images and descriptions.
- Manage active listings (update or delete).
- Edit user profile and personal information.
- Wishlist support to save items for later.

### 💬 Messaging (Optional)
- Chat system for buyers and sellers to communicate directly (integrated with backend if enabled).

---

## 🗂️ Project Structure

```
 /src
├── app/
│   ├── (WithCommonLayout)/         # Public layout and routes (e.g., home, products)
│   ├── (WithDashboardLayout)/      # Dashboard layout and routes (e.g., listing, history)
│   ├── login/                      # Login page
│   ├── register/                   # Registration page
│   ├── favicon.ico
│   ├── globals.css                 # Global styles
│   └── layout.tsx                  # Root layout config
│
├── assets/                         # Static assets (icons, images, etc.)
├── components/                     # Reusable React components
├── constants/                      # Application-wide constants
├── context/                        # React context providers
├── hooks/                          # Custom React hooks
├── lib/                            # Helper libraries or API clients
├── providers/                      # Application-level providers
├── services/                       # API service calls
├── styles/                         # Tailwind and other custom styles
├── types/                          # TypeScript type definitions
└── utils/                          # Utility functions
````
---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Authentication**: JWT (handled in backend)
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🌐 Live Demo

👉 [Live Frontend URL](https://asmart-project.vercel.app/)  

---

## 🔧 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/SangramBishwas/b4-assignment-6/tree/Shuvo/Frontend

# Navigate to the frontend directory
cd Frontend

# Install dependencies
npm install

# Create a .env.local file and add the backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# Run the development server
npm run dev
````

The app should now be running on `http://localhost:3000`.

---

## 📬 Feedback or Contributions

Have suggestions? Feel free to fork the repo, open an issue, or submit a pull request.
Made with ❤️ by hulk smashers v5