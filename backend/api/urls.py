from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path('register/', views.postRegister),
    path('login/', views.postLogin),
    path('problem/', views.problemView),
    path('problem/<int:qid>/', views.getProblem),
    path('problem/<int:qid>/submit/', views.submit),
    path('submissions/', views.getSubmissions),
]