from django.contrib import admin
from viewer.models import Person, Photo

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'id', 'attending', 'dietary_restrictions', 'accommodation_from', 'accommodation_to', 'drink_preferences', 'song')

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('id', 'photo')