from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer,UserPermissionsSerializer
from django.contrib.auth import authenticate
from .models import UserPermissions
from rest_framework_simplejwt.authentication import JWTAuthentication


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'sucess'
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'message': 'Data is not valid',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            permission=UserPermissions.objects.get(user__username=username)
            serializer = UserPermissionsSerializer(permission)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'permission':serializer.data,
                'message':'sucess'
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class TokenRefresh(APIView):
    def post(self,request):

        refresh_token = request.data.get('refresh_token')
        print('inside',refresh_token)
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            return Response({'access_token': access_token})
        except Exception as e:
            return Response({'error': 'Invalid refresh token'}, status=400)

class CheckAuthentication(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        return Response({'message': 'Authenticated'})

class UserData(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        user = request.user
        user_permission = UserPermissions.objects.get(user__username=user)
        if user_permission.admin:
            users = UserPermissions.objects.prefetch_related('user').exclude(user__username=user)
            serializer = UserPermissionsSerializer(users, many=True)
            return Response(serializer.data)
        else:
            # User does not belong to the allowed group, return permission denied message
            return Response({'error': 'Permission denied'}, status=403)

class ChangePermission(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        user = request.data.get('user')
        permission =request.data.get('permission')
        if UserPermissions.admin:
            user_permission = UserPermissions.objects.get(user__username=user)
            if permission == 'no_per':
                user_permission.admin= False
                user_permission.userone= False
                user_permission.usertwo= False
            if permission == 'admin':
                user_permission.admin= True
                user_permission.userone= False
                user_permission.usertwo= False
            if permission == 'userone':
                user_permission.admin= False
                user_permission.userone= True
                user_permission.usertwo= False
            if permission == 'usertwo':
                user_permission.admin= False
                user_permission.userone= False
                user_permission.usertwo= True
            user_permission.save()
            return Response({'message': 'sucess'},status=200)

        else:
            # User does not belong to the allowed group, return permission denied message
            return Response({'error': 'Permission denied'}, status=403)

