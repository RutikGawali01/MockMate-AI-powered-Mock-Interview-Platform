import express from 'express'
import dotenv from "dotenv"
import { connectDb } from "./config/connectDb.js"
import cookieParser from 'cookie-parser';
dotenv.config();
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.routes.js"
import cors from "cors";
import interviewRouter from './routes/interview.route.js';
import paymentRouter from './routes/payment.route.js';

const app = express();
// Middleware to get request  on only frontend with url http://localhost:5173 and allow credentials like cookies
const allowedOrigins = [
    "http://localhost:5173",
    "https://mockmate-ai-powered-mock-interview-xm4m.onrender.com",
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy violation"));
        }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use(cookieParser());



const PORT = process.env.PORT || 6000

app.get('/', (req , res)=>{
    res.send("server started");
})

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/interview', interviewRouter);
app.use("/api/payment", paymentRouter);


app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
    connectDb();
})
