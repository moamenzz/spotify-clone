# Spotify Clone

<div align="center">
<img src="/client/assets/readme-cover.png" alt="Demo Screenshot">
  
  <!-- Tech Stack -->
  
  <div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwind" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="vite" />
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="axios" />
    <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white" alt="zustand" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express.js" />
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
    <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="cloudinary" />
    <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white" alt="sentry" />
    <img src="https://img.shields.io/badge/Zod-EF4444?style=for-the-badge&logo=zod&logoColor=white" alt="zod" />
  </div>
</div>

<br />
<br />

[![Status](https://img.shields.io/badge/Status-InProgress-yellow)]()
[![License](https://img.shields.io/badge/License-MIT-lightgrey)]()
[![Live Demo](https://img.shields.io/badge/Live-Demo-orange)](https://spotify-clone319.vercel.app)

---

## 📖 Description

Spotify Clone is a full-stack music streaming platform inspired by Spotify, built to deliver a seamless and personalized listening experience. Users can explore a rich library of songs across various genres, play tracks, and receive AI-powered music recommendations based on their listening history and preferences.

A standout feature of this clone is the Artist Dashboard, which allows verified artists to upload, manage, and publish their own tracks directly to the platform—turning it into a dynamic, community-driven space for both creators and listeners.

As users interact with the app and play songs, a custom Machine Learning model analyzes their listening patterns to deliver tailored recommendations, closely mimicking the personalization features of the real Spotify experience.

Whether you're discovering new music, diving into your favorite genres, or uploading your own creations, the Spotify Clone offers a powerful, user-friendly interface with real-time feedback and modern streaming capabilities—all built from the ground up.

---

## 🚀 Features

- 🔒 Authentication & OAuth 
- 📦 Full-Stack Application with Song Management/Upload Dashboard & User Interface
- 📼 Song Tracks Upload to Cloudinary  
- 🌐 Fully responsive UI
- 📐 User customizable panels and completely customizable interface 
- ⚙️ Deployment via Render + Vercel  
- 🔀 Custom Playlist Creation 
- 🎵 Full custom audio player functionality & song queue 

Features In Progress: 

- 🧔 Personal Profile & User management
- 🔔 Notifications Functionality
- 🌐 AI Language Learning Model for User Playlist/Song recommendations 
  
---

## 🧠 What I Learned

This project challenged and taught me:

- ✅ Panels and user customizable UI
- ✅ Machine Learning and AI models 
- ✅ Audio-Player functionality

  
---

## 🔧 Technologies Used

| Frontend | Backend | Database | Other |
|----------|---------|----------|-------|
| React    | Node.js (Express.js) | MongoDB (Mongoose)  | JWT, Axios, Vite, Socket.io, Cloudinary, Stripe, etc.|

---

## 🖥️ Live Demo

🌐 [Click here to view the app](https://spotify-clone319.vercel.app/)

---

## 🧪 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/moamenzz/spotify-clone.git

# Navigate to project folder
cd spotify-clone

# Install dependencies for both frontend and backend
cd client && npm install
cd ../server && npm install

# Add .env files in both folders as per .env.example 

# Run the project
npm run dev
```

## 🤫 .env.example

client .env:

```
CLOUDINARY_API_KEY=
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_BACKEND_API=
VITE_GITHUB_OAUTH_URL=
VITE_GOOGLE_OAUTH_URL=
VITE_SENTRY_DSN=
```

server .env:

```
NODE_ENV=
APPLICATION_NAME=
CLIENT_URL=
PORT=
MONGODB_URI=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
RESEND_SECRET=
NODEMAILER_APP_PASSWORD=
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENDER_DOMAIN=
SESSION_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

# ©️ Credits 

The Dashboard Design of this project was inspired by Codesistency on YouTube. 
