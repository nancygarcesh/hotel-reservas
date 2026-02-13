import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import express from "express";
import cookieParser from "cookie-parser";

export const configureApp = (app) => {

  app.use(helmet());

  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));

  app.use(cookieParser());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
  });

  app.use(limiter);
};