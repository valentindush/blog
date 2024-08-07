from django.urls import path
from . import views

urlpatterns = [
    path('auth/login/', views.login, name='login'),
    path('auth/signup/', views.signup, name='signup'),
    path('auth/test_token/', views.test_token, name='test_token'),
    path('posts/', views.PostList.as_view(), name='post-list'),
    path('posts/<int:pk>/', views.PostDetail.as_view(), name='post-detail'),
    path('posts/<int:post_id>/comments/', views.add_comment, name='add-comment'),
    path('comments/<int:pk>/', views.CommentDetail.as_view(), name='comment-detail'),
]
