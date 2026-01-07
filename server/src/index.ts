import express from "express";
import type { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/database";
import { initializeFirebase } from "./config/firebase";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Food Donate API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API Routes (will be added in next steps)
// app.use('/api/users', userRoutes);
// app.use('/api/listings', listingRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/feedback', feedbackRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/leaderboard', leaderboardRoutes);
// app.use('/api/analytics', analyticsRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
    path: req.path,
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

interface ErrorWithStatus extends Error {
  statusCode?: number;
  status?: string;
}

app.use(
  (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";

    console.error("Error:", err);

    res.status(statusCode).json({
      status,
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
);

// ============================================
// SERVER INITIALIZATION
// ============================================

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected successfully");

    // Initialize Firebase
    await initializeFirebase();
    console.log("✅ Firebase initialized successfully");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Start the server
startServer();

export default app;
