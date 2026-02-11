import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import express from "express";

export const configureApp = (app) => {

  app.use(helmet());

  app.use(cors({
    origin: "*"
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
  });

  app.use(limiter);
};