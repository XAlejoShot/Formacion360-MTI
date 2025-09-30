from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Manager personalizado para crear usuarios y admins
class UsuarioManager(BaseUserManager):
    def create_user(self, email, nombre_completo, password=None, **extra_fields):
        if not email:
            raise ValueError("El usuario debe tener un correo electrónico")
        email = self.normalize_email(email)
        user = self.model(email=email, nombre_completo=nombre_completo, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nombre_completo, password=None, **extra_fields):
        extra_fields.setdefault("rol", "administrador")
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, nombre_completo, password, **extra_fields)


# Modelo de Usuario
class Usuario(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, max_length=100)
    nombre_completo = models.CharField(max_length=150)
    telefono = models.CharField(max_length=20, null=True, blank=True)
    direccion = models.CharField(max_length=300, null=True, blank=True)
    ciudad = models.CharField(max_length=100, null=True, blank=True)
    pais = models.CharField(max_length=100, default="Colombia")
    foto_perfil_url = models.CharField(max_length=500, null=True, blank=True)

    # Campos de control
    rol = models.CharField(max_length=20, choices=[("administrador", "Administrador"), ("estudiante", "Estudiante")], default="estudiante")
    estado = models.CharField(max_length=20, choices=[("activo", "Activo"), ("inactivo", "Inactivo"), ("suspendido", "Suspendido")], default="activo")
    
    fecha_registro = models.DateTimeField(auto_now_add=True)
    fecha_ultimo_acceso = models.DateTimeField(null=True, blank=True)

    # Campos requeridos para Django Admin
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nombre_completo"]

    def __str__(self):
        return self.email
