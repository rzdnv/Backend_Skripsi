// import express from "express";
// import { publicRouter } from "../routes/route";
// import { errorHandler } from "../middleware/error-handler";
// import cors from "cors";
// export const web = express();

// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://34.126.178.89:5001",
//   "https://frontend-203493376264.asia-southeast1.run.app",
//   "http://192.168.88.1:5001",
//   "https://192.168.88.1:5001",
// ];

// // Middleware CORS dengan origin dinamis
// const corsOptions: cors.CorsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); // izinkan
//     } else {
//       callback(new Error("Not allowed by CORS")); // tolak
//     }
//   },
//   credentials: true,
// };

// web.get("/", (req, res) => {
//   res.send("Server Main Route Aktif! Jalur API ada di /api 🚀");
// });

// // Terapkan CORS
// web.use(cors(corsOptions));

// // Handle preflight OPTIONS untuk semua route
// web.options("*", cors(corsOptions));

// web.use(express.json());
// web.use("/api", publicRouter);
// web.use(errorHandler);

import express from "express";
import { publicRouter } from "../routes/route";
import { errorHandler } from "../middleware/error-handler";
import cors from "cors";

export const web = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://34.126.178.89:5001",
  "https://frontend-skripsi-reza.vercel.app",
  "http://192.168.88.1:5001",
  "https://192.168.88.1:5001",
];

// Middleware CORS dengan origin dinamis
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // izinkan
    } else {
      callback(new Error("Not allowed by CORS")); // tolak
    }
  },
  credentials: true,
};

// 1. TERAPKAN CORS DI SINI (SEBELUM ALL ROUTE)
web.use(cors(corsOptions));
web.options("*", cors(corsOptions));

// 2. KELOMPOK PARSING BODY
web.use(express.json());

// 3. ROUTE UTAMA
web.get("/", (req, res) => {
  res.send("Server Main Route Aktif! Jalur API ada di /api 🚀");
});

// 4. ROUTE API & ERROR HANDLER
web.use("/api", publicRouter);
web.use(errorHandler);
