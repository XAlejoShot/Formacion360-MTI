# backend/usuarios/views.py

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str

from rest_framework_simplejwt.views import TokenObtainPairView

# Importamos los nuevos serializadores
from .serializers import (
    RegisterSerializer, 
    UserSerializer, 
    MyTokenObtainPairSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer
)

# Obtenemos el modelo de usuario
Usuario = get_user_model()

class RegisterView(generics.CreateAPIView):
    """
    Vista para registrar un nuevo usuario.
    Usa el RegisterSerializer y permite el acceso a cualquiera (AllowAny).
    """
    queryset = Usuario.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Vista de login que utiliza nuestro serializador personalizado para incluir
    datos del usuario en la respuesta del token.
    """
    serializer_class = MyTokenObtainPairSerializer


class UserListView(generics.ListAPIView):
    """
    Vista para listar todos los usuarios.
    Solo accesible por administradores (IsAdminUser).
    Usa el UserSerializer para no exponer datos sensibles.
    """
    queryset = Usuario.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class PasswordResetRequestView(generics.GenericAPIView):
    """
    Vista para solicitar el restablecimiento de contraseña.
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        
        try:
            user = Usuario.objects.get(email=email)

            # Generar token y UID
            token_generator = PasswordResetTokenGenerator()
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = token_generator.make_token(user)

            # Construir la URL de restablecimiento
            # Asegúrate de que la URL del frontend sea la correcta
            reset_url = f"http://localhost:3000/reset-password/{uidb64}/{token}"

            # Enviar correo
            send_mail(
                'Restablecimiento de Contraseña',
                f'Hola {user.nombre_completo},\n\nHaz clic en el siguiente enlace para restablecer tu contraseña:\n{reset_url}\n\nSi no solicitaste esto, ignora este mensaje.',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
        except Usuario.DoesNotExist:
            # Si el usuario no existe, no hacemos nada, pero no revelamos el error.
            # Esto previene ataques de enumeración de usuarios.
            pass

        return Response({"detail": "Si existe una cuenta asociada con este correo, se ha enviado un enlace para restablecer la contraseña."}, status=status.HTTP_200_OK)

class PasswordResetConfirmView(generics.GenericAPIView):
    """
    Vista para confirmar el restablecimiento de contraseña.
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, uidb64, token, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = Usuario.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, Usuario.DoesNotExist):
            user = None

        token_generator = PasswordResetTokenGenerator()
        if user is not None and token_generator.check_token(user, token):
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({"detail": "La contraseña ha sido restablecida con éxito."}, status=status.HTTP_200_OK)
        
        return Response({"detail": "El enlace de restablecimiento no es válido o ha expirado."}, status=status.HTTP_400_BAD_REQUEST)
