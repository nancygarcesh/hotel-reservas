import { useState, ChangeEvent, FormEvent } from "react";
import { registerRequest } from "../api/authApi";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { validateEmail, validatePassword } from "../utils/validators";
import { useNavigate, Link } from "react-router-dom";
import { RegisterForm, FormErrors } from "../types/auth";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err: FormErrors = {};

    if (!form.name) err.nombre = "Nombre requerido";

    if (!validateEmail(form.email))
      err.email = "Email inválido";

    if (!validatePassword(form.password))
      err.password = "Mínimo 6 caracteres";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await registerRequest(form);

      navigate("/login");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-200 via-cyan-200 to-teal-200 dark:bg-gray-900 p-6">
      <Card>
        <h1 className="text-2xl font-bold mb-6 text-center">
          🌺 Crear Cuenta
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <Input
            label="Nombre"
            name="nombre"
            onChange={handleChange}
            error={errors.nombre}
          />

          <Input
            label="Email"
            name="email"
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

          <Button loading={loading}>Registrarse</Button>

          <p className="text-center text-sm">
            ¿Ya tienes cuenta?
            <Link to="/login" className="text-teal-600 ml-1">
              Iniciar sesión
            </Link>
          </p>

        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;