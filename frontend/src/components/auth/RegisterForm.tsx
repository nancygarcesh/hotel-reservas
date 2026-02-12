import { useState } from "react";
import api from "@/services/api";

export default function RegisterForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err: any = {};

    if (!form.nombre) err.nombre = "Nombre requerido";
    if (!form.email.includes("@")) err.email = "Email inválido";
    if (form.password.length < 6)
      err.password = "Mínimo 6 caracteres";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/auth/register", form);

      window.location.href = "/login";
    } catch (error: any) {
      alert(error.response?.data?.message || "Error registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-16 flex flex-col gap-4"
    >
      <input
        name="nombre"
        placeholder="Nombre"
        onChange={handleChange}
      />
      {errors.nombre && <span>{errors.nombre}</span>}

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />
      {errors.password && <span>{errors.password}</span>}

      <button
        disabled={loading}
        className="bg-hotel-accent text-white p-2"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}