import { urlencoded } from 'express';
import express from 'express';
import cors from 'cors';

export const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

const LOCAL_ENVOIRMENT_FRONTEND_URL = process.env.LOCAL_ENV_URL;
const PRODUCTION_ENVOIRMENT_FRONTEND_URL = process.env.PRODUCTION_WEB_URL;
const allowedOrigins = [
    LOCAL_ENVOIRMENT_FRONTEND_URL,
    PRODUCTION_ENVOIRMENT_FRONTEND_URL
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);
