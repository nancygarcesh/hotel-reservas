@echo off
mkdir src\api
mkdir src\hooks
mkdir src\store
mkdir src\components\Auth
mkdir src\components\UI
mkdir src\pages
mkdir src\routes

type nul > src\api\axiosInstance.ts
type nul > src\hooks\useAuth.ts
type nul > src\store\useAuthStore.ts
type nul > src\components\Auth\LoginForm.tsx
type nul > src\components\Auth\RegisterForm.tsx
type nul > src\components\UI\Button.tsx
type nul > src\components\UI\Input.tsx
type nul > src\pages\LoginPage.tsx
type nul > src\pages\RegisterPage.tsx
type nul > src\routes\ProtectedRoute.tsx

echo Estructura de archivos creada exitosamente!