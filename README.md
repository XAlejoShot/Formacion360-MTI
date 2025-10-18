# Formación 360

Este proyecto es una aplicación web de formación educativa construida con Next.js (frontend) y Django (backend).

## Requisitos previos

- Node.js (versión 18 o superior)
- Python (versión 3.8 o superior)
- PostgreSQL (opcional, si no se usa SQLite)

## Instalación y configuración

### Backend (Django)

1. Navega al directorio del backend:
   ```bash
   cd backend
   ```

2. Crea un entorno virtual (opcional pero recomendado):
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Configura la base de datos:
   - Si usas PostgreSQL, asegúrate de tenerlo instalado y configurado.
   - Si prefieres SQLite (por defecto), no necesitas hacer nada.

5. Ejecuta las migraciones:
   ```bash
   python manage.py migrate
   ```

6. (Opcional) Crea un superusuario:
   ```bash
   python manage.py createsuperuser
   ```

7. Ejecuta el servidor de desarrollo:
   ```bash
   python manage.py runserver
   ```

### Frontend (Next.js)

1. Instala las dependencias:
   ```bash
   npm install
   # o
   pnpm install
   ```

2. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   pnpm dev
   ```

## Uso

- El frontend estará disponible en `http://localhost:3000`
- El backend estará disponible en `http://localhost:8000`
- La API del backend estará en `http://localhost:8000/api/`

## Configuración adicional

- Asegúrate de configurar las variables de entorno necesarias (como credenciales de email en `settings.py`).
- Para producción, cambia `DEBUG = False` en `backend/backend/settings.py` y configura `ALLOWED_HOSTS` apropiadamente.

## Estructura del proyecto

- `app/`: Código del frontend Next.js
- `backend/`: Código del backend Django
- `components/`: Componentes reutilizables del frontend
- `public/`: Archivos estáticos del frontend
