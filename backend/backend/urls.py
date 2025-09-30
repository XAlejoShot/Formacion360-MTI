# backend/backend/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Ruta para el panel de administración de Django
    path('admin/', admin.site.urls),

    # Incluimos todas las URLs de la app 'usuarios' bajo el prefijo 'api/users/'
    # Ej: /api/users/register/, /api/users/login/, etc.
    path('api/users/', include('usuarios.urls')),

    # Puedes agregar aquí otras apps de tu API, por ejemplo:
    # path('api/cursos/', include('cursos.urls')),
]