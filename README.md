# 💬 Chatly

<div align="center" width="200>

<img src="./assets/ChatlyLogo.png" alt="Chatly Logo" width="400"/>>

**A modern, feature-rich mobile chat application built with React Native** 

The app where you can get chatty with your friends!  
Chatly is a mobile chat application built with React Native.  
It provides users with a chat interface and options to share images and their location.  

[![GitHub issues](https://img.shields.io/github/issues/eahowell/chat-app?color=red&logo=github)](https://github.com/eahowell/chat-app/issues)
[![GitHub stars](https://img.shields.io/github/stars/eahowell/chat-app?color=yellow&logo=github)](https://github.com/eahowell/chat-app/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/eahowell/chat-app?color=blue&logo=github)](https://github.com/eahowell/chat-app/network)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~51.0.28-black?logo=expo)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10.3.1-orange?logo=firebase)](https://firebase.google.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 🚀 Features

### 💬 **Core Chat Features**
- **Real-time messaging** with Firebase Firestore
- **Offline message reading** with local storage
- **Anonymous authentication** for quick access
- **Custom background colors** for personalization

### 📱 **Rich Media Support**
- 📷 **Image sharing** from camera or gallery
- 📍 **Location sharing** with interactive maps
- 🎤 **Voice messages** with audio recording
- 🖼️ **Image storage** via Firebase Cloud Storage

### ♿ **Accessibility First**
- **Screen reader compatible** with proper ARIA labels
- **Keyboard navigation** support
- **High contrast** color schemes
- **Voice control** friendly interface

### 🌐 **Cross-Platform**
- 📱 **iOS & Android** native performance
- 💻 **Web support** via React Native Web
- 🔄 **Network-aware** with offline/online detection

---

## 📱 Demo

<div align="center">

| Offline Mode | Feature Demo |
|--------------|--------------|
| ![Offline Mode](./assets/Chatly-OfflineMode.gif) | ![Actions Demo](./assets/Chatly-Actions.gif) |

</div>

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React Native + Expo |
| **Authentication** | Firebase Auth (Anonymous) |
| **Database** | Firebase Firestore |
| **Storage** | Firebase Cloud Storage |
| **Local Storage** | AsyncStorage |
| **Navigation** | React Navigation 6 |
| **Chat UI** | React Native Gifted Chat |
| **Maps** | React Native Maps |
| **Media** | Expo Image Picker, Camera, AV |

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** (v16.19.0+)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **Expo Go** app on your device

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/eahowell/chat-app.git
cd chat-app

# Install dependencies
npm install
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Firestore Database**, **Authentication** (Anonymous), and **Storage**
3. Copy your Firebase config and replace the config in `App.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 3. Run the App

```bash
# Start the development server
npm start

# Run on specific platform
npm run android  # Android
npm run ios      # iOS
npm run web      # Web
```

---

## 🎯 Usage

### Getting Started
1. **Launch the app** and enter your name
2. **Choose a background color** from the available options
3. **Tap "Start Chatting"** to enter the chat room

### Chat Features
- **Send messages** by typing and pressing send
- **Share images** via the "+" button → "Choose From Library" or "Take Picture"
- **Share location** via the "+" button → "Send Location"
- **Record voice messages** via the "+" button → "Record a Sound"

### Offline Mode
- **Previous messages** are automatically cached for offline viewing
- **Network status** is displayed when offline
- **Messages sync** automatically when back online

---

## 📁 Project Structure

```
chatly/
├── 📁 assets/              # Images and static files
├── 📁 components/          # React components
│   ├── Chat.js            # Main chat interface
│   ├── CustomActions.js   # Media sharing actions
│   └── Start.js           # Welcome/login screen
├── App.js                 # Main app component
├── DatabaseContext.js     # Firebase context
├── colorMatrix.js         # Theme configurations
└── package.json           # Dependencies
```

---

## 🛠️ Development

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator/device
npm run ios        # Run on iOS simulator/device
npm run web        # Run on web browser
```

### Environment Setup

<details>
<summary><strong>🤖 Android Development</strong></summary>

1. Install [Android Studio](https://developer.android.com/studio)
2. Set up Android SDK and emulator
3. Run `npm run android`

</details>

<details>
<summary><strong>🍎 iOS Development (macOS only)</strong></summary>

1. Install [Xcode](https://developer.apple.com/xcode/) from App Store
2. Install Xcode Command Line Tools
3. Run `npm run ios`

</details>

---

## 🔧 Troubleshooting

<details>
<summary><strong>Common Issues & Solutions</strong></summary>

### Connection Issues
- **Problem**: Expo server connection failure
- **Solution**: Ensure device and computer are on the same Wi-Fi network

### Android Emulator
- **Problem**: App crashes on launch
- **Solution**: Perform a cold boot of the emulator
- **Problem**: Can't connect to Metro bundler
- **Solution**: Run `adb reverse tcp:8081 tcp:8081`

### Camera/Media Issues
- **Problem**: Camera permission denied
- **Solution**: Enable camera permissions in device settings
- **Problem**: Image upload fails
- **Solution**: Check Firebase Storage rules and internet connection

### Firebase Issues
- **Problem**: Authentication fails
- **Solution**: Verify Firebase config and enable Anonymous auth
- **Problem**: Messages not syncing
- **Solution**: Check Firestore rules and network connection

</details>

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines

- 📝 **Write clear commit messages**
- 🧪 **Test your changes** on multiple platforms
- 📖 **Update documentation** as needed
- 🎨 **Follow the existing code style**
- ♿ **Maintain accessibility** standards

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)** - Chat UI components
- **[Firebase](https://firebase.google.com/)** - Backend services
- **[Expo](https://expo.dev/)** - Development platform
- **[React Navigation](https://reactnavigation.org/)** - Navigation library

---

## ✉️ Contact

**Developer:** [Elizabeth Howell](ehowell.webdev@gmail.com)  
**Website:** [Portfolio](http://ehowell-dev.me/PortfolioWebsite/)  
**Twitter:** [ehowell_webdev](https://x.com/ehowell_webdev)  
**GitHub:** [eahowell](https://github.com/eahowell)

---

<div align="center">

**Built with ❤️ by [E Howell](https://github.com/eahowell)**

*Made with React Native & Firebase*

</div>