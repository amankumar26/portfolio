# 🚀 Gamified Portfolio & Management System

A state-of-the-art, full-stack portfolio application designed to showcase professional achievements, projects, and competitive programming statistics with a premium, animated user interface. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## ✨ Features

- **🏠 Dynamic Landing Page:** A visually stunning home page with smooth animations powered by Framer Motion.
- **📊 Competitive Programming Dashboard:** Integrate and display real-time statistics from platforms like LeetCode.
- **🛠️ Admin Panel:** A secure, comprehensive dashboard to manage:
  - **Profile Details:** Update bio, social links, and skills.
  - **Project Management:** Add, edit, or remove projects with image upload support.
  - **Skill Set:** Organize and showcase technical expertise.
  - **Platform Stats:** Track problem-solving progress (Easy/Medium/Hard counts).
- **🕹️ Gamification:** XP and Leveling system based on project completions and competitive programming milestones.
- **📱 Responsive & Modern UI:** Fully optimized for mobile and desktop with a focus on premium aesthetics and dark mode support.
- **☁️ Cloud Integration:** Image and file uploads handled via Cloudinary.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS 4, CSS Variables
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **File Uploads:** Multer & Cloudinary
- **Environment:** Dotenv

---

## 📂 Project Structure

```text
├── server/               # Node.js/Express Backend
│   ├── models/           # Mongoose Schemas (Profile, Project, Activity)
│   ├── routes/           # API Endpoints
│   ├── .env              # Backend Environment Variables
│   └── index.js          # Server Entry Point
├── src/                  # React Frontend
│   ├── components/       # Reusable UI Components
│   ├── pages/            # Page Views (Public & Admin)
│   ├── context/          # State Management
│   ├── assets/           # Static Assets
│   └── App.tsx           # Frontend Logic
└── package.json          # Dependency Manifest
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account for media storage

### Setup Backend

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Setup Frontend

1. Navigate to the root directory:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 🧪 Development

- **Linting:** `npm run lint`
- **Build:** `npm run build`
- **Preview:** `npm run preview`

---

## 🛡️ License

This project is licensed under the MIT License.

---

*Built with ❤️ by [Priyanka Kumari](https://github.com/Priyankakumari015)*
