from django.urls import path
from .views import RegisterView, LoginView,UserData,ChangePermission,CheckAuthentication,TokenRefresh

urlpatterns = [
    path(r'register', RegisterView.as_view(), name='register'),
    path(r'login', LoginView.as_view(), name='login'),
    path(r'check-authentication', CheckAuthentication.as_view(), name='CheckAuthentication'),
    path(r'refresh-token', TokenRefresh.as_view(), name='TokenRefresh'),
    path(r'user-data', UserData.as_view(), name='UserData'),
    path(r'change-permission', ChangePermission.as_view(), name='ChangePermission'),
]
