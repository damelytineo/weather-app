import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());


app.get('/api/search', async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }

        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${name}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch from geocoding API');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

app.get('/api/weather', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and Longitude parameters are required' });
        }

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch from weather API');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.error('Route not found:', req.url);
  res.status(404).json({ error: 'Not Found' });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});