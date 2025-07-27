# 🛒 ByteBazaar

**ByteBazaar** is a full-stack digital marketplace where users can seamlessly buy and sell digital products.  
Built with the **MERN stack**, it enables creators to upload, manage, and showcase their products — like **eBooks**, **design assets**, **templates**, and more.

---

## 🚀 Features

- 🔐 User Authentication (Sign Up / Login)
- 🛍️ Create, Read, Update, Delete (CRUD) Products
- 🖼️ Upload and display product images/files
- 🧭 Product listing on marketplace
- 💻 Responsive UI using React
- 🔒 Secure backend with Express & MongoDB

---

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB

---

## 🌱 Environment Variables (.env)

Create a `.env` file in the `backend` folder and add the following:

```env
PORT=3000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_jwt_secret_here
UPLOAD_DIR=public
```
---

## ⚙️ Setup Instructions

### 🔧 Clone the Repository

```bash
git clone https://github.com/your-username/bytebazaar.git
cd bytebazaar
```

### 🔙 Set Up Backend

```bash
cd backend
npm install
node index.js
```
### 💻 Set Up Frontend

```bash
cd frontend
npm install
npm run dev

