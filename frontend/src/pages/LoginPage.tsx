import React from "react";
import { LoginForm } from "@/components/Auth/LoginForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const LoginPage: React.FC = () => (
  <>
    <LoginForm />
    <ToastContainer position="top-right" autoClose={3000} />
  </>
);