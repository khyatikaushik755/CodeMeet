import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

app.use(express.json());
// app.use(urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js"
import roomRouter from "./routes/room.routes.js"
import { ApiResponse } from "./utils/ApiResponse.js";

app.use("/users", userRouter);
app.use("/rooms", roomRouter);

app.use((err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const data = err.data ?? null;
    const response = new ApiResponse(statusCode, data, message);
    res.status(statusCode).json(response);
});

export default app;