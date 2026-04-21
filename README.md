# Advanced E-Commerce Platform

A robust, full-stack e-commerce solution built with modern web technologies. This platform features a scalable monorepo-style architecture with distinct applications for the customer storefront (Client), the management dashboard (Admin), and the API backend (Server).

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-RTK-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-teal)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-success)

## 📁 Project Structure

The repository is organized into three main directories, each serving a distinct purpose:

### `/client` (Customer Storefront)
A high-performance Next.js App Router application serving as the customer-facing storefront.
* **Tech Stack:** Next.js 15, React, Tailwind CSS, Shadcn UI, Redux Toolkit, RTK Query.
* **Features:** 
  * Responsive product grid and detailed product pages.
  * Complex state management using Redux (Shopping Cart, Auth).
  * System-aware Dark/Light mode theme toggling.
  * RTK Query for efficient data fetching and caching.

### `/admin` (Management Dashboard)
A secure Next.js App Router application for store administrators.
* **Tech Stack:** Next.js 15, React, Tailwind CSS, Shadcn UI, Redux Toolkit, RTK Query.
* **Features:**
  * Protected dashboard layout with sidebar navigation.
  * Analytics overview (Revenue, Orders, Users).
  * Product management interface (CRUD operations).
  * Dark/Light mode theme support.

### `/server` (API Backend)
A robust Node.js and Express RESTful API powering both the client and admin applications.
* **Tech Stack:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs.
* **Features:**
  * Comprehensive Mongoose schemas (`User`, `Product`, `Order`, `Category`).
  * Secure authentication using HTTP-only JSON Web Tokens (JWT).
  * Role-based access control (Admin vs. Standard User).
  * API endpoints for products, authentication, and user profiles.

## 🚀 Getting Started

To run this platform locally, you will need to start all three services. Ensure you have Node.js and MongoDB installed on your machine.

### 1. Server Setup
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Configure environment variables: Ensure your `server/.env` file has the correct values.
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce
   JWT_SECRET=your_super_secret_key_here
   NODE_ENV=development
   ```
4. Start the development server: `npm run dev` (or `node index.js`)

### 2. Client Setup
1. Open a new terminal and navigate to the client: `cd client`
2. Install dependencies: `npm install`
3. Start the Next.js development server: `npm run dev`
4. The storefront will be available at `http://localhost:3000`

### 3. Admin Setup
1. Open a new terminal and navigate to the admin directory: `cd admin`
2. Install dependencies: `npm install`
3. Start the Next.js development server: `npm run dev -- -p 3001`
4. The admin portal will be available at `http://localhost:3001`

## 🔒 Authentication Flow
This application uses industry-standard security practices for authentication. Instead of storing tokens in vulnerable `localStorage`, the server issues HTTP-only cookies containing the JWT. This protects the application from Cross-Site Scripting (XSS) attacks while maintaining seamless session management via RTK Query and Express middleware.

## 🎨 UI/UX Design
Both frontend applications leverage **Tailwind CSS** for rapid, utility-first styling and **Shadcn UI** for accessible, customizable, and beautifully designed components. **Next-themes** is implemented globally to provide an elegant dark/light mode experience out of the box.

---
*Built with ❤️ using Next.js and Express.*
