$(document).ready(function() {

    const calendar = $('#calendar');

    calendar.evoCalendar({
        theme: 'default',
        format:'mm/dd/yyyy',
        titleFormat:'MM yyyy',
        eventHeaderFormat:'MM d, yyyy',
        'firstDayOfWeek': 0,
        'todayHighlight': true,
        'sidebarDisplayDefault': false,
        language:'es',
        es:{
            
            days: ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],
            daysShort: ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],
            daysMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
            months: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
            monthsShort: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
            noEventForToday:"No hay evento para hoy.. ¡así que descanse! :)",
            noEventForThisDay:"Ningún evento para este día.. ¡así que descanse! :)",
        },

    })


    calendar.evoCalendar('addCalendarEvent', [
     {
          id: 'kNybja6',
          name: 'Mom\'s Birthday',
          date: new Date(),
          type: 'birthday',
          everyYear: true // optional
     },
     {
          id: 'asDf87L',
          name: 'Graduation Day!',
          date: 'July 21, 2021',
          type: 'event'
     }
    ]);

    const new_event_button = document.getElementById('new_event')
    const event_form_container = document.getElementById('event-container')

    // radio buttons and div-classes 
    let days_radio = $('input[name=days]:radio')
        let one_day = $('.one-day')
        let multiple_days = $('.multiple-days')

    let custom_day = $('.custom-day')
        
    
    // crear formulario, y metodos para crear los eventos.
    // method to select one day or multiple days
    days_radio.change(function(e) {
        let value = e.target.value
        
        if(value == "one-day"){
            one_day.removeClass('none')
            multiple_days.addClass('none')

        }else{
            multiple_days.removeClass('none')
            one_day.addClass('none')
        }   
    })

    // method to select a custom date into one_day radio button
    one_day.change(function(e){
        let value = e.target.value

        if(value == "custom-day"){
            custom_day.removeClass('none')
        }else{
            custom_day.addClass('none')
        }
    })

    function newEvent() {
        event_form_container.classList.add('active');
    }

    new_event_button.addEventListener('click', () => newEvent())
})
