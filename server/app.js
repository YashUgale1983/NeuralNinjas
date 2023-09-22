import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// IMPORTING ROUTERS
import doctorRouter from "./routes/doctorRoutes.js";
import patientRouter from "./routes/patientRoutes.js";

/* CREATING APP */
const app = express();

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    // origin: ["http://192.168.0.106:3000", "http://localhost:3000"],
    origin: ["http://192.168.0.106:3000", "http://localhost:3000"],
    credentials: true, // Allow cookies and authentication headers to be sent
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

/* ROUTES */

// doctor and patient authentication related routes
app.use("/docAuth", doctorRouter);
app.use("/patientAuth", patientRouter);

// generic routes
app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter);

// booking routes

export default app;
