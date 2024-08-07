from django.urls import re_path
from .auth import auth

urlpatterns = [
    re_path('api/auth/login', auth.login),
    re_path('api/auth/signup', auth.signup),
    # re_path('api/auth/test_token', auth.test_token)
]
