import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Server is running! 🚀');
});

// AI API Call Route
app.post('/ask', async (req, res) => {
    try {
        const { question } = req.body; // Extract the question from the request body
        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        const response = await fetch("https://api.worqhat.com/api/ai/content/v4", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer wh_m76gtkoxLWL13MhmKI0JfolJKSo1JV3weQY3xIUu9xm"
            },
            body: JSON.stringify({
                "question": question,
                "model": "aicon-v4-nano-160824",
                "randomness": 0.5,
                "stream_data": true,
                "training_data": "Add your training data or system messages",
                "response_type": "text",
            }),
        });

        const result = await response.text();
        res.json({ output: result });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
