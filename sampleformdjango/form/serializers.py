from rest_framework import serializers
from .models import *

class formserializers(serializers.ModelSerializer):
    class Meta:
        model = form
        fields = '__all__'
