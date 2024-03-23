import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// IMPORTING ROUTERS
import authRouter from "./routes/authRoutes.js";

/* CREATING APP */
const app = express();

/* CONFIGURATIONS */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json({ limit: "50mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    // origin: ["http://192.168.0.106:3000", "http://localhost:3000"],
    origin: ["http://192.168.0.106:3000", "http://localhost:3001"],
    credentials: true, // Allow cookies and authentication headers to be sent
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

/* ROUTES */

// generic routes
app.use("/", authRouter);

// booking routes

export default app;
