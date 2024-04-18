from django.contrib import admin
from viewer.models import Person

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'id', 'attending', 'dietary_restrictions', 'accommodation_from', 'accommodation_to', 'drink_preferences', 'song')