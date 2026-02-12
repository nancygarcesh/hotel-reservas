import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import axiosInstance from "@/api/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";

export const LoginForm: React.FC = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.includes("@")) newErrors.email = "Email inválido";
    if (password.length < 6) newErrors.password = "Contraseña mínima 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/login", { email, password });
      setAuth(res.data.usuario, res.data.token);
      toast.success("Login exitoso");
      window.location.href = "/";
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error de login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Iniciar Sesión</h2>
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
      <Button type="submit" disabled={loading}>{loading ? "Cargando..." : "Ingresar"}</Button>
    </form>
  );
};