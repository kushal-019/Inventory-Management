# MERN Stack Project

## Overview

This project implements a full-stack application using the MERN stack (MongoDB, Express.js, React.js, Node.js). Below are the details of the available APIs for authentication, order management, and inventory management.

---

## API Endpoints

### **Authentication (`auth`)**

1. **Register a New User**

   - **URL**: `http://localhost:8080/api/v1/auth/register`
   - **Method**: POST
   - **Description**: Registers a new user in the system.

2. **Login User**
   - **URL**: `http://localhost:8080/api/v1/auth/login`
   - **Method**: POST
   - **Description**: Logs in an existing user and returns a token.

---

### **Order Management (`orders`)**

1. **Order History**

   - **URL**: `http://localhost:8080/api/v1/orders/orderhistory`
   - **Method**: GET
   - **Description**: Retrieves the order history of the logged-in user.

2. **Received Orders**

   - **URL**: `http://localhost:8080/api/v1/orders/orderrecieved`
   - **Method**: GET
   - **Description**: Retrieves the list of orders received by the user as a supplier.

3. **Placed Orders**
   - **URL**: `http://localhost:8080/api/v1/orders/orderplaced`
   - **Method**: GET
   - **Description**: Retrieves the list of orders placed by the user.

---

### **Inventory Management (`inventory`)**

1. **Supplier Inventory**

   - **URL**: `http://localhost:8080/api/v1/supplier`
   - **Method**: GET
   - **Description**: Fetches inventory details for the logged-in supplier.

2. **Show Inventory**

   - **URL**: `http://localhost:8080/api/v1/supplier/showinventory/676eedd943e45dffa9a951e2`
   - **Method**: GET
   - **Description**: Retrieves the inventory details for the specified supplier.

3. **Update Inventory**
   - **URL**: `http://localhost:8080/api/v1/supplier/updateinventory/674f5dd3f47dd01e09d24262`
   - **Method**: PATCH
   - **Description**: Updates inventory details for the specified supplier.

---

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Redux
- **Authentication**: JSON Web Tokens (JWT)

---

## Setup Instructions

1. **Navigate to the project directory**:

   ```bash
   cd Inventory-Management

   ```

2. **Install dependencies**:

   ```bash
   npm install

   ```

3. **Start the backend server**:

```bash
    cd server
   npm run dev

```

4. **Start the frontend development server**:

```bash
    cd client
    npm run dev
```