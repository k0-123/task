import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('>>> Connected to MongoDB locally'))
    .catch((err) => console.error('DB Connection Error:', err));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);


app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is up and running' });
});



const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`>>> Server is live on port ${PORT}`);
    });
}

export default app;
