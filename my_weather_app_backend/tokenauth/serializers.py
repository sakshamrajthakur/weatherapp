# serializers.py (authentication app level)

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserPermissions
from rest_framework.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise ValidationError('Username already exists')
        return value
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        userpermission=UserPermissions(user=user).save()
        return user
class UserPermissionsSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserPermissions
        fields = ['user','admin', 'userone', 'usertwo']

