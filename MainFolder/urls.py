from django.contrib import admin
from django.urls import path
from viewer.views import homepage, submitted_form
from MainFolder.backend_funcs import submit_form, submit_form_no_attendance


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', homepage, name='homepage'),
    path('submitted_form/<str:hash>/', submitted_form, name='submitted_form'),

    path('submit_form/', submit_form, name='submit_form'),
    path('submit_form_no_attendance/', submit_form_no_attendance, name='submit_form_no_attendance'),
]
