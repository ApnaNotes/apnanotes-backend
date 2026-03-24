import { app } from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4001; //fallback

app.listen(PORT, () => {
    console.log(`Backend Sever is running on port ${PORT}`);
});
