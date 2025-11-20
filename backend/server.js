require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file upload (storage in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.post('/api/remove-bg', upload.single('image_file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const apiKey = process.env.REMOVE_BG_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({ error: 'API Key not configured on server' });
        }

        // Prepare form data for remove.bg API
        const formData = new FormData();
        formData.append('image_file', req.file.buffer, req.file.originalname);
        formData.append('size', 'auto');

        // Call remove.bg API
        const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': apiKey,
            },
            responseType: 'arraybuffer' // Important: get binary data back
        });

        // Send image back to frontend
        res.set('Content-Type', 'image/png');
        res.send(response.data);

    } catch (error) {
        console.error('Error processing image:', error.response ? error.response.data.toString() : error.message);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});