# Crear estructura de carpetas para proyecto
$basePath = "src"

# Array con las carpetas a crear
$folders = @(
    "components",
    "layouts", 
    "pages",
    "services",
    "store",
    "hooks",
    "utils",
    "styles"
)

# Crear carpeta src si no existe
if (!(Test-Path $basePath)) {
    New-Item -ItemType Directory -Path $basePath -Force
}

# Crear cada subcarpeta dentro de src
foreach ($folder in $folders) {
    $fullPath = Join-Path $basePath $folder
    if (!(Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force
        Write-Host "Creada: $fullPath" -ForegroundColor Green
    } else {
        Write-Host "Ya existe: $fullPath" -ForegroundColor Yellow
    }
}

Write-Host "`nEstructura de carpetas creada exitosamente!" -ForegroundColor Cyan