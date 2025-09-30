from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

class UsuarioAdmin(UserAdmin):
    model = Usuario
    list_display = ("email", "nombre_completo", "rol", "estado", "is_active", "is_staff")
    list_filter = ("rol", "estado", "is_active", "is_staff")
    search_fields = ("email", "nombre_completo")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Información Personal", {"fields": ("nombre_completo", "telefono", "direccion", "ciudad", "pais", "foto_perfil_url")}),
        ("Permisos", {"fields": ("rol", "estado", "is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Fechas importantes", {"fields": ("last_login", "fecha_registro", "fecha_ultimo_acceso")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "nombre_completo", "password1", "password2", "rol", "estado", "is_active", "is_staff")}
        ),
    )

admin.site.register(Usuario, UsuarioAdmin)

