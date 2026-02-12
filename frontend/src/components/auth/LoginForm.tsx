import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(email, password);
    window.location.href = "/dashboard";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 flex flex-col gap-4"
    >
      <input
        type="email"
        placeholder="Correo"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="bg-hotel-accent p-2 text-white">
        Login
      </button>
    </form>
  );
}