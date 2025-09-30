# backend/usuarios/urls.py

from django.urls import path
from .views import RegisterView, MyTokenObtainPairView, UserListView, PasswordResetRequestView, PasswordResetConfirmView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Ruta para el registro de un nuevo usuario
    # POST /api/users/register/
    path('register/', RegisterView.as_view(), name='user_register'),

    # Ruta para el login (obtener tokens de acceso y refresco)
    # POST /api/users/login/
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    # Ruta para refrescar el token de acceso
    # POST /api/users/login/refresh/
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Ruta para listar todos los usuarios (solo para admins)
    # GET /api/users/
    path('', UserListView.as_view(), name='user_list'),

    # Rutas para el restablecimiento de contraseña
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
