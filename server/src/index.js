import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());
app.get('/api/search', async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}`);
        if (!response.ok) {
            throw new Error('Failed to fetch from geocoding API');
        }
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error('Error in /api/search:', error);
        res.status(500).json({ error: 'Failed to search locations' });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map