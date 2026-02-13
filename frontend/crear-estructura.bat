@echo off
echo Creando estructura...
echo.

REM ===== SRC =====
if not exist src mkdir src

if not exist src\main.tsx type nul > src\main.tsx
if not exist src\App.tsx type nul > src\App.tsx
if not exist src\vite-env.d.ts type nul > src\vite-env.d.ts
if not exist src\index.css type nul > src\index.css


REM ===== ASSETS =====
if not exist src\assets mkdir src\assets
if not exist src\assets\logo.svg type nul > src\assets\logo.svg
if not exist src\assets\default-room.jpg type nul > src\assets\default-room.jpg


REM ===== COMPONENTS =====
if not exist src\components mkdir src\components
if not exist src\components\common mkdir src\components\common
if not exist src\components\layout mkdir src\components\layout
if not exist src\components\auth mkdir src\components\auth
if not exist src\components\rooms mkdir src\components\rooms
if not exist src\components\reservations mkdir src\components\reservations
if not exist src\components\admin mkdir src\components\admin
if not exist src\components\ui mkdir src\components\ui


REM COMMON
type nul > src\components\common\Loader.tsx
type nul > src\components\common\Skeleton.tsx
type nul > src\components\common\Toast.tsx
type nul > src\components\common\Modal.tsx
type nul > src\components\common\ErrorBoundary.tsx
type nul > src\components\common\PrivateRoute.tsx


REM LAYOUT
type nul > src\components\layout\Layout.tsx
type nul > src\components\layout\Header.tsx
type nul > src\components\layout\Sidebar.tsx
type nul > src\components\layout\MobileMenu.tsx


REM AUTH
type nul > src\components\auth\LoginForm.tsx
type nul > src\components\auth\RegisterForm.tsx


REM ROOMS
type nul > src\components\rooms\RoomCard.tsx
type nul > src\components\rooms\RoomList.tsx
type nul > src\components\rooms\RoomDetail.tsx
type nul > src\components\rooms\RoomForm.tsx
type nul > src\components\rooms\RoomFilters.tsx


REM RESERVATIONS
type nul > src\components\reservations\ReservationCard.tsx
type nul > src\components\reservations\ReservationList.tsx
type nul > src\components\reservations\ReservationForm.tsx
type nul > src\components\reservations\ReservationDetail.tsx
type nul > src\components\reservations\AvailabilityCalendar.tsx


REM ADMIN
type nul > src\components\admin\UserManagement.tsx
type nul > src\components\admin\UserForm.tsx
type nul > src\components\admin\RoleManagement.tsx
type nul > src\components\admin\HotelConfig.tsx
type nul > src\components\admin\Statistics.tsx


REM UI
type nul > src\components\ui\Button.tsx
type nul > src\components\ui\Input.tsx
type nul > src\components\ui\Select.tsx
type nul > src\components\ui\Card.tsx
type nul > src\components\ui\Badge.tsx
type nul > src\components\ui\DatePicker.tsx
type nul > src\components\ui\ThemeToggle.tsx


REM ===== PAGES =====
if not exist src\pages mkdir src\pages

type nul > src\pages\Login.tsx
type nul > src\pages\Register.tsx
type nul > src\pages\Dashboard.tsx
type nul > src\pages\Rooms.tsx
type nul > src\pages\RoomDetail.tsx
type nul > src\pages\CreateRoom.tsx
type nul > src\pages\EditRoom.tsx
type nul > src\pages\Reservations.tsx
type nul > src\pages\CreateReservation.tsx
type nul > src\pages\ReservationDetail.tsx
type nul > src\pages\Profile.tsx
type nul > src\pages\AdminPanel.tsx
type nul > src\pages\NotFound.tsx
type nul > src\pages\Unauthorized.tsx


REM ===== HOOKS =====
if not exist src\hooks mkdir src\hooks

type nul > src\hooks\useAuth.ts
type nul > src\hooks\useRooms.ts
type nul > src\hooks\useReservations.ts
type nul > src\hooks\useUsers.ts
type nul > src\hooks\useTheme.ts
type nul > src\hooks\useToast.ts


REM ===== SERVICES =====
if not exist src\services mkdir src\services

type nul > src\services\api.ts
type nul > src\services\authService.ts
type nul > src\services\roomService.ts
type nul > src\services\reservationService.ts
type nul > src\services\userService.ts


REM ===== STORE =====
if not exist src\store mkdir src\store

type nul > src\store\authStore.ts
type nul > src\store\roomStore.ts
type nul > src\store\reservationStore.ts
type nul > src\store\userStore.ts
type nul > src\store\uiStore.ts
type nul > src\store\index.ts


REM ===== TYPES =====
if not exist src\types mkdir src\types

type nul > src\types\index.ts
type nul > src\types\auth.ts
type nul > src\types\room.ts
type nul > src\types\reservation.ts
type nul > src\types\user.ts
type nul > src\types\api.ts


REM ===== UTILS =====
if not exist src\utils mkdir src\utils

type nul > src\utils\constants.ts
type nul > src\utils\helpers.ts
type nul > src\utils\validators.ts
type nul > src\utils\dateUtils.ts


REM ===== CONFIG =====
if not exist src\config mkdir src\config
type nul > src\config\roles.ts


echo.
echo ESTRUCTURA CREADA
pause