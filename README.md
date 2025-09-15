# Homex (Building Management System)

A full-featured **Building Management System (BMS)** web application built with React (frontend) and Node.js/Express (backend).  
This system helps manage a single building with role-based dashboards, apartment listings, agreement requests, payments, coupons, and announcements.

---

## 🌐 Live URL
👉 [Homex Live Link](https://homex-6e24e.web.app)
---
## 🌐 Related Repositories
- **Frontend (Server):** [Homex Server Repo](https://github.com/nazmulrahat786/BUILDING-MANAGEMENT-SERVER/tree/main)

---

## 🎯 Purpose
The purpose of this project is to create a **centralized platform** for building management where **admins, members, and users** can seamlessly interact.  
It provides a secure environment to handle apartment agreements, manage members, post announcements, process payments, and offer discounts via coupons.

---

## 🚀 Key Features
- 🔐 **Authentication** with JWT (Login, Register, Role-based access: admin, member, user).  
- 🏠 **Apartments Management** – view available apartments, send/approve agreements.  
- 👥 **Role-based Dashboards** – different UI and permissions for Admin, Member, and User.  
- 📢 **Announcements Management** – admins can post/manage building announcements.  
- 🎟️ **Coupon System** – create and apply coupons for discounts.  
- 💳 **Payment Integration** – secure payment history and invoice generation.  
- 📊 **Responsive UI** – clean and modern design with TailwindCSS & DaisyUI.  
- ⚡ **TanStack Query** – optimized fetching and caching of data.  
- 🛡️ **Protected Routes** – backend verifies JWT token and role for secure endpoints.  

---

## 🔑 Admin Login Credentials
To explore the **Admin Dashboard**, you can use the following credentials:

- **Admin email:** `rahat@gmail.com`  
- **Admin password** `Admin1234`  

---

## 📦 NPM Packages Used

### Frontend
- **react** – UI framework  
- **react-router-dom** – routing  
- **@tanstack/react-query** – data fetching & caching  
- **axios** – API requests  
- **tailwindcss** – styling  
- **daisyui** – prebuilt components  
- **framer-motion** – animations  
- **react-hot-toast** – toast notifications  
- **lucide-react** – icons  
- **react-hook-form** – form handling  
- **yup** – form validation schema  
- **sweetalert2** – alerts & confirmations  

### Backend
- **express** – web server  
- **cors** – cross-origin requests  
- **dotenv** – environment variable management  
- **jsonwebtoken (JWT)** – authentication  
- **bcryptjs** – password hashing  
- **mongodb** – database  
- **morgan** – request logging  

---

## 📖 How to Run Locally
1. Clone the repo  
   ```bash
   git clone https://github.com/nazmulrahat786/BUILDING-MANAGEMENT-CLIENT.git
   cd homex
