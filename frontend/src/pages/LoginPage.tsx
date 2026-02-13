import { useState, ChangeEvent, FormEvent } from "react";
import { loginRequest } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import { validateEmail } from "../utils/validators";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm, FormErrors } from "../types/auth";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!validateEmail(form.email))
      newErrors.email = "Email inválido";

    if (!form.password)
      newErrors.password = "Contraseña requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setServerError("");

      const res = await loginRequest(form);

      setAuth(res.user, res.token);

      navigate("/dashboard");

    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.mensaje || "Error al iniciar sesión"
        );
      } else {
        setServerError("Error inesperado");
      }

    } finally {
      setLoading(false);
    }

    const res = await loginRequest(form);
    console.log("LOGIN RESPONSE =>", res);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-emerald-200 to-cyan-200 dark:bg-gray-900 p-6">
      <Card>
        <h1 className="text-2xl font-bold mb-6 text-center">
          🌴 Bienvenido al Hotel Paradise
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <Input
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            onChange={handleChange}
            error={errors.password}
          />

          {serverError && (
            <p className="text-red-500 text-center">{serverError}</p>
          )}

          <Button loading={loading}>Iniciar sesión</Button>

          <p className="text-center text-sm">
            ¿No tienes cuenta?
            <Link to="/registro" className="text-teal-600 ml-1">
              Registrarse
            </Link>
          </p>

        </form>
      </Card>
    </div>
  );
};

export default LoginPage;