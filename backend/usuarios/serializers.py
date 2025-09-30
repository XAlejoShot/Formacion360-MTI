# backend/usuarios/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Obtiene el modelo de usuario que definimos en settings.py
Usuario = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializador para el registro de nuevos usuarios.
    La contraseña es de solo escritura, lo que significa que se usa para la creación
    pero no se muestra en las respuestas de la API.
    """
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Usuario
        # Campos requeridos para crear un nuevo usuario.
        fields = ('email', 'nombre_completo', 'password')

    def create(self, validated_data):
        """
        Sobrescribimos el método create para hashear la contraseña antes de guardarla.
        """
        user = Usuario.objects.create_user(
            email=validated_data['email'],
            nombre_completo=validated_data['nombre_completo'],
            password=validated_data['password']
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    """
    Serializador para representar el modelo de Usuario.
    Se usa para leer/listar usuarios, excluyendo campos sensibles como la contraseña.
    """
    class Meta:
        model = Usuario
        # Campos que se mostrarán en las respuestas de la API.
        fields = ('id', 'email', 'nombre_completo', 'rol', 'estado', 'foto_perfil_url')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializador personalizado para el token de login.
    Hereda del serializador base de Simple JWT y le añade información
    adicional del usuario a la respuesta del token.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Añadir campos personalizados al payload del token
        token['nombre_completo'] = user.nombre_completo
        token['rol'] = user.rol
        token['email'] = user.email

        return token

    def validate(self, attrs):
        # La data que se retorna al hacer login
        data = super().validate(attrs)

        # Añadimos los datos del usuario a la respuesta del login
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'nombre_completo': self.user.nombre_completo,
            'rol': self.user.rol
        }
        return data

class PasswordResetRequestSerializer(serializers.Serializer):
    """
    Serializador para solicitar el restablecimiento de contraseña.
    Solo valida que el campo de email esté presente y tenga un formato válido.
    """
    email = serializers.EmailField(required=True)

class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Serializador para confirmar el restablecimiento de contraseña.
    Valida que las contraseñas coincidan.
    """
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Las contraseñas no coinciden."}) 
        return attrs
