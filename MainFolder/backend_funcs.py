from django.http import JsonResponse
from django.shortcuts import redirect
from viewer.models import Person
from datetime import datetime
import json
import hashlib
import random


def generate_hash_code():
    random_number = random.randint(0, 99999999)
    random_hash = hashlib.sha256(str(random_number).encode('utf-8')).hexdigest()[:8]

    if not Person.objects.filter(hash=random_hash).exists():
        return random_hash
    else:
        return generate_hash_code()


def submit_form(request):
    if request.method == 'POST':
        form_data = request.POST
        print(form_data)

        drink_preferences = form_data.getlist('drink_preferences')
        diet_restrictions_bool = form_data['diet_restrictions_checkbox']

        accommodation_input = form_data['accommodation']
        accommodation_from = None
        accommodation_to = None
        if accommodation_input == 'one_night':
            accommodation_from = datetime.strptime('21.09.2024', '%d.%m.%Y').date()
            accommodation_to = datetime.strptime('22.09.2024', '%d.%m.%Y').date()
        elif accommodation_input == 'multiple_nights':
            accommodation_from = form_data['accommodation_from']
            accommodation_to = form_data['accommodation_to']

        drinks_string = ''
        for drink in drink_preferences:
            drinks_string += f'{drink}\n'

        new_person = Person.objects.create(
            full_name=form_data['full_name'],
            attending=True if form_data['attending'] == 'yes' else False,
            dietary_restrictions=form_data['diet_restrictions_details'] if diet_restrictions_bool else None,
            accommodation_from=accommodation_from,
            accommodation_to=accommodation_to,
            drink_preferences=drinks_string,
            song=form_data['song'],
            hash=generate_hash_code()
        )

        return redirect('submitted_form', hash=new_person.hash)


def submit_form_no_attendance(request):
    if request.method == 'POST':
        json_data = json.loads(request.body.decode('utf-8'))

        new_person = Person.objects.create(
            full_name=json_data['full_name'],
            attending=False,
            dietary_restrictions=None,
            accommodation_from=None,
            accommodation_to=None,
            drink_preferences='',
            song='',
            hash=generate_hash_code()
        )

        return JsonResponse({"status": "success"})
    return JsonResponse({"status": "error"})