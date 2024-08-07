from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.login, name='login'),
    path('api/signup/', views.signup, name='signup'),
    path('api/test_token/', views.test_token, name='test_token'),
    path('api/posts/', views.PostList.as_view(), name='post-list'),
    path('api/posts/<int:pk>/', views.PostDetail.as_view(), name='post-detail'),
    path('api/posts/<int:post_id>/comments/', views.CommentListCreate.as_view(), name='comment-list-create'),
    path('api/comments/<int:pk>/', views.CommentDetail.as_view(), name='comment-detail'),
]
