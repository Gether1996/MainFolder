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


function areYouSure() {
    var full_name_input = document.getElementById("full_name");
    var attending_no_radio = document.getElementById("attending_no");

    if (!full_name_input.value) {
        attending_no_radio.checked = false;
        Swal.fire({
            icon: 'error',
            title: 'Vyplňte najskôr Vaše meno a priezvisko prosím.',
        });
        return false;
    }

    Swal.fire({
        icon: 'question',
        title: `${full_name_input.value} - naozaj sa nezúčastníte svadby?`,
        text: 'Po potvrdení sa dotazník ukončí a bude zaevidovaná Vaša neúčasť.',
        showConfirmButton: true,
        confirmButtonText: 'Áno, nezúčastním sa',
        confirmButtonColor: '#2e513d',
        showCancelButton: true,
        cancelButtonText: 'Zrušiť',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                confirmButtonColor: '#2e513d',
                title: `Mrzí nás, že sa nedostavíte na našu svadbu.<br>
                        ${full_name_input.value} - evidujeme Vašu neúčasť.`,
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc || result.dismiss === Swal.DismissReason.close) {
                    window.location.reload();
                }
            });

            fetch('/submit_form_no_attendance/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrf_token
                },
                body: JSON.stringify({ full_name: full_name_input.value })
            }).catch((error) => {
                console.error('Error:', error);
            });
        } else {
            attending_no_radio.checked = false;
        }
    });
}


function smoothScroll(targetId) {
    var target = document.getElementById(targetId);
    if (target) {
      var targetPosition = target.offsetTop - 100; // Get the target element's position with an additional 100px offset from the top
      var startPosition = window.pageYOffset; // Get current position
      var distance = targetPosition - startPosition;
      var duration = 1000; // Set the duration of the scroll in milliseconds
      let start = null;

      // Function to perform the scrolling animation
      function animation(currentTime) {
        if (start === null) {
          start = currentTime;
        }
        var timeElapsed = currentTime - start;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      // Easing function for smooth scrolling
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
}

$('.slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    dots: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-left-to-arc"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right-to-arc"></i></button>',
    customPaging: function(slider, i) {
        return '<button type="button" class="custom-dot"></button>';
    }
});