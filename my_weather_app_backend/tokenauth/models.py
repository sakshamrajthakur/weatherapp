from django.db import models
from django.contrib.auth.models import User

class UserPermissions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='permissions')
    admin = models.BooleanField(default=False)
    userone =  models.BooleanField(default=False)
    usertwo =models.BooleanField(default=False)
  


 