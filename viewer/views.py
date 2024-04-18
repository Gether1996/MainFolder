from django.shortcuts import render
from viewer.models import Photo


def homepage(request):

    photos = Photo.objects.all()

    return render(request, 'homepage.html', {'photos': photos})

def form(request):
    return render(request, 'form.html')