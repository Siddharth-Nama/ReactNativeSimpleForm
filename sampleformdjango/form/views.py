from django.shortcuts import render
import base64
from .models import *
from django.core.files.base import ContentFile
from .serializers import *
from rest_framework.generics import ListAPIView
from rest_framework import status
from rest_framework.response import Response
# Create your views here.
class formview(ListAPIView):
    queryset=form.objects.all()
    serializer_class=formserializers

class formpost(ListAPIView):
    queryset = form.objects.all()
    serializer_class = formserializers

    def post(self, request):
        firstname = request.data.get('firstname')
        middlename = request.data.get('middlename', '')
        lastname = request.data.get('lastname')
        phoneno = request.data.get('phoneno')
        age = request.data.get('age')
        feedback = request.data.get('feedback')
        rating = request.data.get('rating')
        image = request.FILES.get('image', None)  # Use request.FILES to get uploaded files
        
        if image:
            # Ensure the image file is an instance of UploadedFile
            if not isinstance(image):
                return Response({"error": "Invalid image format"}, status=status.HTTP_400_BAD_REQUEST)
            
        user = form.objects.create(
            firstname=firstname,
            phoneno=phoneno,
            middlename=middlename,
            lastname=lastname,
            age=age,
            feedback=feedback,
            rating=rating,
            image=image
        )
        user.save()
        return Response(status=status.HTTP_200_OK)