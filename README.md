# 📝 Full Stack Firebase Notes App

A simple yet powerful **full stack notes application** built with **React, Firebase, and TailwindCSS**.  
This app allows users to **add, edit, delete, and manage notes** with real-time updates and categorized summaries.  

---

## 🔗 Live Demo
👉 [Try the App Here](https://fire-base-notes-app.vercel.app/)

---

## 🚀 Features
- 🔐 **Authentication** – Secure login/signup with Firebase Auth.  
- 🗒️ **Notes Management** – Add, edit, and delete notes with a rich text editor (TinyMCE).  
- ⚡ **Real-time Updates** – Notes are synced instantly using Firebase Realtime Database.  
- 📂 **Categorized View** – Notes organized by **year** and **month** with timestamps.  
- 🎨 **Modern UI** – Responsive design powered by TailwindCSS.  
- 🖊️ **Rich Text Editing** – Create detailed notes with formatting support.  

---

## 🛠️ Tech Stack
- **Frontend**: React, TailwindCSS  
- **Backend & Database**: Firebase (Auth + Realtime Database)  
- **Editor**: TinyMCE  

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Navigate to project folder
cd your-repo-name

# Install dependencies
npm install

# Create a .env file and add your Firebase config
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id

# Start the development server
npm run dev
