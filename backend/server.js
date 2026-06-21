import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import gymRoutes from "./routes/gymRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js"
import trainerRoutes from "./routes/trainerRoutes.js";
import path from "path"; 
import uploadRoutes from "./routes/uploadRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

dotenv.config();

if(!process.env.JWT_SECRET){
  throw new Error("JWT_SECRET not defined in .env file");
}

const app = express();


connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/plans",planRoutes);
app.use("/api/purchase",purchaseRoutes);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/gyms",gymRoutes);
app.use("/api/feedback",feedbackRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/gallery", galleryRoutes);
// app.use("/api/admin",adminRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});