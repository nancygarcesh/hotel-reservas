import React from "react";
import { RegisterForm } from "@/components/Auth/RegisterForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const RegisterPage: React.FC = () => (
  <>
    <RegisterForm />
    <ToastContainer position="top-right" autoClose={3000} />
  </>
);