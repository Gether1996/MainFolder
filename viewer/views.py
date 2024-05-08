from django.shortcuts import render
from viewer.models import Photo, Person


def homepage(request):

    photos = Photo.objects.all()

    return render(request, 'homepage.html', {'photos': photos})

def form(request):
    return render(request, 'form.html')


def submitted_form(request, hash):
    person = Person.objects.get(hash=hash)
    return render(request, 'submitted_form.html', {'person': person})