from django.urls import path
from form.views import *
urlpatterns = [
    path('form/',formview.as_view()),
    path('submit/',formpost.as_view()),
]
