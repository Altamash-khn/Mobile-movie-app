# Movie App

A **learning-based movie application** built with **React Native (Expo)** where users can explore movies, view details, and save favorites.  
This project focuses on practicing **real-world mobile app development concepts** such as API integration, authentication, state management, and modern UI styling using **TMDB API**, **NativeWind**, and **Appwrite (BaaS)**.

---

## Features

- Browse popular and trending movies (based on recent user searches)  
- View detailed movie information  
- Track searched movies and store top results  
- Display last 5 searched movies as trending  
- Save movies to favorites (logged-in users only)  
- User authentication using Appwrite  
- Clean and responsive UI with NativeWind  

---

## Tech Stack

- React Native (Expo)  
- React  
- TypeScript & JavaScript  
- NativeWind (Tailwind CSS for React Native)  
- TMDB API (Movie data)  
- Appwrite (Authentication & Database)  

---

## Project Setup

### 1️⃣ Clone the repository
```bash
git clone <https://github.com/Altamash-khn/Mobile-movie-app.git>
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file and add your credentials:

```env
EXPO_PUBLIC_MOVIE_API_KEY=YOUR_API_KEY
EXPO_PUBLIC_APPWRITE_PROJECT_ID=YOUR_API_KEY
EXPO_PUBLIC_APPWRITE_DATABASE_ID=YOUR_API_KEY
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=YOUR_API_KEY
EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_ID=YOUR_API_KEY
```

> ⚠️ Make sure to replace these values with your **own keys**.

---

### 4️⃣ Run the app
```bash
npx expo start
```