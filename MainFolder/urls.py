from django.contrib import admin
from django.urls import path
from viewer.views import homepage
from MainFolder.backend_funcs import submit_form


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', homepage, name='homepage'),

    path('submit_form/', submit_form, name='submit_form'),
]
