document.addEventListener("DOMContentLoaded", function() {
    var multipleNightsRadio = document.getElementById("accommodation_multiple_nights");
    var dateInputsContainer = document.querySelector(".date-from-to-inputs");
    var fromDateInput = document.getElementById("accommodation_from");
    var toDateInput = document.getElementById("accommodation_to");

    var allRadios = document.querySelectorAll('input[name="accommodation"]');

    allRadios.forEach(function(radio) {
        radio.addEventListener("change", function() {
            if (this.id === "accommodation_multiple_nights" && this.checked) {
                setTimeout(function() {
                    dateInputsContainer.style.display = "block";
                    dateInputsContainer.offsetHeight;
                    dateInputsContainer.style.opacity = 1;
                    fromDateInput.required = true;
                    toDateInput.required = true;
                }, 100);
            } else {
                dateInputsContainer.style.opacity = 0;
                setTimeout(function() {
                    dateInputsContainer.style.display = "none";
                    fromDateInput.required = false;
                    toDateInput.required = false;
                    fromDateInput.value = null;
                    toDateInput.value = null;
                }, 300);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var dietRestrictionsYesRadio = document.getElementById("diet_restrictions_yes");
    var dietRestrictionsTextInput = document.querySelector(".diet-restrictions-text-input");
    var dietHiddenInput = document.getElementById("diet_restrictions_details");

    var allDietRestrictionsRadios = document.querySelectorAll('input[name="diet_restrictions_checkbox"]');

    allDietRestrictionsRadios.forEach(function(radio) {
        radio.addEventListener("change", function() {
            if (this.id === "diet_restrictions_yes" && this.checked) {
                dietRestrictionsTextInput.style.display = "block";
                setTimeout(function() {
                    dietRestrictionsTextInput.style.opacity = 1;
                    dietHiddenInput.required = true;
                }, 100);
            } else {
                dietRestrictionsTextInput.style.opacity = 0;
                setTimeout(function() {
                    dietRestrictionsTextInput.style.display = "none";
                    dietHiddenInput.required = false;
                    dietHiddenInput.value = null;
                }, 300);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('rsvpForm');
    const segments = document.querySelectorAll('.segment');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let isComplete = true;
        let incompleteSegmentId = '';

        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            const inputs = segment.querySelectorAll('input[type="radio"], input[type="checkbox"], input[type="text"], textarea');
            let segmentComplete = false;

            inputs.forEach(input => {
                if ((input.type === 'radio' && input.checked) || (input.type === 'checkbox' && input.checked) || (input.type === 'text' && input.value.trim() !== '') || input.tagName.toLowerCase() === 'textarea') {
                    segmentComplete = true;
                }
            });

            if (!segmentComplete) {
                isComplete = false;
                incompleteSegmentId = segment.id;
                break;
            }
        }

        if (!isComplete) {
            let errorMessage = '';
            switch (incompleteSegmentId) {
                case 'name_surname_segment':
                    errorMessage = 'Vyplňte meno a priezvisko.';
                    break;
                case 'attending_segment':
                    errorMessage = 'Vyplňte "Zúčastníš sa na našej svadbe?"';
                    break;
                case 'restrictions_segment':
                    errorMessage = 'Vyplňte intolerancie.';
                    break;
                case 'accommodation_segment':
                    errorMessage = 'Vyplňte ubytovanie.';
                    break;
                case 'drinks_segment':
                    errorMessage = 'Vyplňte nápoje.';
                    break;
                case 'song_segment':
                    errorMessage = 'Vyplňte pesničku.';
                    break;


                default:
                    errorMessage = 'Prosím vyplňte všetky polia.';
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
            return;
        }

        form.submit();
    });
});