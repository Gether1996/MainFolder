from django.shortcuts import redirect
from viewer.models import Person
from datetime import datetime


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
            drinks_string += f'{drink} '

        new_person = Person.objects.create(
            full_name=form_data['full_name'],
            attending=True if form_data['attending'] == 'yes' else False,
            dietary_restrictions=form_data['diet_restrictions_details'] if diet_restrictions_bool else None,
            accommodation_from=accommodation_from,
            accommodation_to=accommodation_to,
            drink_preferences=drinks_string,
            song=form_data['song']
        )

        return redirect('homepage')
