import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "react-toastify";

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (name.length < 2) newErrors.name = "Nombre muy corto";
    if (!email.includes("@")) newErrors.email = "Email inválido";
    if (password.length < 6) newErrors.password = "Contraseña mínima 6 caracteres";
    if (!phone.match(/^\d{7,}$/)) newErrors.phone = "Teléfono inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await axiosInstance.post("/auth/register", { name, email, phone, password });
      toast.success("Registro exitoso");
      window.location.href = "/login";
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error de registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Registrarse</h2>
      <Input label="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      <Input label="Teléfono" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
      <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
      <Button type="submit" disabled={loading}>{loading ? "Cargando..." : "Registrarse"}</Button>
    </form>
  );
};