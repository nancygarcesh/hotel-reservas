import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(form.email, form.password);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Credenciales incorrectas"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 flex flex-col gap-4"
    >
      <input
        name="email"
        placeholder="Correo"
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
        required
      />

      {error && <span className="text-red-500">{error}</span>}

      <button
        disabled={loading}
        className="bg-hotel-accent p-2 text-white"
      >
        {loading ? "Ingresando..." : "Login"}
      </button>
    </form>
  );
}
