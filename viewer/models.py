from django.db.models import *

class Person(Model):
    full_name = CharField(max_length=150)
    attending = BooleanField()
    dietary_restrictions = CharField(max_length=250, null=True)
    accommodation_from = DateField(null=True)
    accommodation_to = DateField(null=True)
    drink_preferences = TextField()
    song = CharField(max_length=100)

class Photo(Model):
    photo = ImageField(upload_to='static/images/')