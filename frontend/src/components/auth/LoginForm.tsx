import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isFormValid =
    email.length > 3 &&
    validateEmail(email) &&
    password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isFormValid) return;

    try {
      setLoading(true);
      await login(email, password);
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
    <section className="min-h-screen flex bg-gradient-to-br from-[#F4F7FA] to-[#E8EDF3] dark:from-[#0F172A] dark:to-[#111827]">

      {/* PANEL VISUAL IZQUIERDO */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-14 bg-[#1E3A5F] text-white">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">
            Hotel Fjord
          </h2>
          <p className="mt-4 text-blue-100 max-w-md leading-relaxed">
            Gestiona reservas, habitaciones y clientes en una
            experiencia moderna inspirada en la elegancia nórdica.
          </p>
        </div>

        <p className="text-sm text-blue-200">
          Plataforma profesional de administración hotelera
        </p>
      </div>

      {/* FORMULARIO */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div
          className="w-full max-w-md bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-2xl rounded-3xl p-10"
          role="region"
          aria-labelledby="login-title"
        >
          <h1
            id="login-title"
            className="text-3xl font-semibold text-slate-800 dark:text-slate-100 text-center mb-8"
          >
            Bienvenida
          </h1>

          {error && (
            <div
              className="mb-6 p-3 rounded-xl bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-sm"
              role="alert"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            noValidate
          >
            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                type="email"
                placeholder="correo@hotel.com"
                aria-invalid={!validateEmail(email)}
                aria-describedby="email-error"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                focus:outline-none focus:ring-2 focus:ring-[#2A6F97]
                transition"
              />

              {!validateEmail(email) && email.length > 0 && (
                <span
                  id="email-error"
                  className="text-xs text-red-500"
                >
                  Ingresa un email válido
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                Contraseña
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={password.length < 6}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600
                  bg-white dark:bg-slate-800
                  focus:outline-none focus:ring-2 focus:ring-[#2A6F97]
                  transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
                  aria-label="Mostrar u ocultar contraseña"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {password.length > 0 && password.length < 6 && (
                <span className="text-xs text-red-500">
                  Mínimo 6 caracteres
                </span>
              )}
            </div>

            {/* BOTÓN LOGIN */}
            <button
              disabled={!isFormValid || loading}
              className="mt-2 py-3 rounded-xl font-semibold
              bg-[#2A6F97] text-white
              hover:bg-[#245C7E]
              disabled:opacity-50
              transition
              flex items-center justify-center gap-2
              shadow-lg shadow-blue-900/20"
            >
              {loading && (
                <Loader2 className="animate-spin" />
              )}
              Ingresar
            </button>

            {/* REGISTER LINK */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              ¿No tienes cuenta?{" "}
              <a
                href="/register"
                className="font-semibold text-[#2A6F97] hover:underline"
              >
                Crear cuenta
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}