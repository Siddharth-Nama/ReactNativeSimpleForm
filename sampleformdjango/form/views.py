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
        image_base64 = request.data.get('image')  # Assuming image is a base64 string
        
        # Decode base64 image
        if image_base64:
            try:
                if ';base64,' in image_base64:
                    format, imgstr = image_base64.split(';base64,') 
                    ext = format.split('/')[-1]
                    data = ContentFile(base64.b64decode(imgstr), name='image.' + ext)
                else:
                    return Response({"error": "Invalid image format"}, status=status.HTTP_400_BAD_REQUEST)
            except (ValueError, IndexError, base64.binascii.Error):
                return Response({"error": "Invalid image data"}, status=status.HTTP_400_BAD_REQUEST)
        user = form.objects.create(
            firstname=firstname,
            phoneno=phoneno,
            middlename=middlename,
            lastname=lastname,
            age=age,
            feedback=feedback,
            rating=rating,
            image=data
        )
        user.save()
        return Response(status=status.HTTP_200_OK)