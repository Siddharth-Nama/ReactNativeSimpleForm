from django.db import models
class form(models.Model):
    firstname = models.CharField(max_length=30)
    middlename = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    phoneno = models.IntegerField(max_length=10,default=8000694996)
    age = models.IntegerField(max_length=3 , default=30)
    image = models.ImageField(upload_to='media' , null=True)
    rating = models.IntegerField(choices=[
        (1, '1 - Poor'),
        (2, '2 - Fair'),
        (3, '3 - Average'),
        (4, '4 - Good'),
        (5, '5 - Excellent')
    ])
    feedback = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.firstname+" "+self.middlename+" "+self.lastname

