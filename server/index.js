import express from "express";
import cors from "cors";



const app = express();
const port = 5000;

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get();