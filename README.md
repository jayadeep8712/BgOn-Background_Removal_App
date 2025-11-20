<div align="center">

# BGON - Background Wizard

![Node](https://img.shields.io/badge/Node.js-v14%2B-green)
![Express](https://img.shields.io/badge/Express-v4-lightgrey)
![Status](https://img.shields.io/badge/Status-Active-success)

**Bgon** is a powerful, sleek, and easy-to-use web application that removes image backgrounds automatically using AI. Built with a modern dark-mode UI, it features a seamless Drag & Drop interface, interactive gallery sliders, and a robust Node.js backend.

</div>
---

## 📸 Screenshots

<!-- You can upload your screenshots to a folder named 'screenshots' or use image hosting and link them here -->
<p align="center">
  <img src="UI.png" alt="Bgon Interface" width="800">
</p>

## ✨ Key Features

*   **🚀 Lightning Fast:** Powered by Node.js and optimized API integration.
*   **🎨 Modern UI:** Fully responsive, dark-themed interface with glassmorphism effects.
*   **🖱️ Drag & Drop:** Seamless file upload experience.
*   **🖼️ Interactive Gallery:** "Before & After" sliders to showcase capability.
*   **👀 Instant Preview:** Side-by-side comparison of the original and processed image.
*   **🔒 Privacy Focused:** Images are processed securely and never stored permanently.

---

## 🛠️ Tech Stack

### Frontend
*   **HTML5 & CSS3:** Custom layout with Flexbox/Grid and CSS Variables.
*   **JavaScript (Vanilla):** Handles drag-and-drop logic, API communication, and UI interactions.
*   **Assets:** Boxicons for iconography.

### Backend
*   **Node.js & Express:** Server-side logic.
*   **Multer:** Handling `multipart/form-data` for image uploads.
*   **Axios:** Communicating with the removal API.
*   **Dotenv:** Secure Environment Variable management.

---

## ⚙️ Installation & Setup

Follow these steps to get **Bgon** running on your local machine.

### Prerequisites
*   [Node.js](https://nodejs.org/) installed.
*   An API Key from [Remove.bg](https://www.remove.bg/api) (Free).

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/bgon.git
cd bgon
```
### 2. Backend Setup

The backend acts as a proxy to protect your API key.
```bash
# Go to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file
touch .env
```
Configure your .env file:

Open the .env file and add the following lines:
```
PORT=3000
REMOVE_BG_API_KEY=your_actual_api_key_here

```
### 3. Run the Server
```
# Start the backend server
node server.js
```
**You should see: Server running on http://localhost:3000**

4. Frontend Setup

1.Open a new terminal window.
2.Navigate to the frontend folder.
3.Open index.html in your browser (or use VS Code Live Server extension for the best experience).

📂 Folder Structure
```
bgon/
├── backend/              # Server-side logic
│   ├── .env              # API Keys (Create this file)
│   ├── server.js         # Express server entry point
│   └── package.json      # Backend dependencies
└── frontend/             # Client-side UI
    ├── index.html        # Main HTML structure
    ├── style.css         # Styling and Animations
    ├── script.js         # Logic for uploads and sliders
    └── assets/           # Images for the gallery
```

## 📖 How to Use

1. Ensure the Backend server is running (node server.js).
2. Open the Frontend in your browser.
3. Drag and Drop an image onto the upload card, or click "Browse Files".
4. Click the "Remove Background" button.
5. Wait for the magic! 🪄
6. View the side-by-side comparison and click "Download" to save your transparent PNG.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or want to add features (like batch processing), feel free to fork the repository.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

<p align="center">
Made with ❤️ by Jayadeep Pendela
</p>

