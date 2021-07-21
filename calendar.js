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
            type: '',
          everyYear: true // optional
     },
     {
          id: 'asDf87L',
          name: 'Graduation Day!',
          date: 'July 21, 2021',
            type: '',
            color:"orange"
          
     }
    ]);

    const new_event_button = document.getElementById('new_event')
    const event_form_container = document.getElementById('event-container')
    const close_event_button = document.getElementById('close-event_button')
    const save_event_button = document.getElementById('save_event')


    // event form ids
    const event_name_input = document.getElementById('event_name')
    const color_input = document.getElementById('color')

    const day_selected_input = document.getElementById('select-day')

    const custom_radio = document.getElementById('custom-radio')
    const custom_day_input = document.getElementById('custom-day')

    const multiple_days_input = document.getElementById('multiple-days')
    const first_day_input = document.getElementById('first-day')
    const last_day_input = document.getElementById('last-day')

    // radio buttons and div-classes 
    let days_radio = $('input[name=days]:radio')
        let one_day = $('.one-day')
        let multiple_days = $('.multiple-days')

    let custom_day_class = $('.custom-day')
        
    
    // crear formulario, y metodos para crear los eventos.
    // method to select one day or multiple days
    days_radio.change(function(e) {
        let value = e.target.value
        
        if(value == "one-day"){
            one_day.removeClass('none')
            multiple_days.addClass('none')
            first_day_input.value = ""
            last_day_input.value = ""

        }else{
            multiple_days.removeClass('none')
            one_day.addClass('none')
            custom_day_class.addClass('none')
        }   
    })

    // method to select a custom date into one_day radio button
    one_day.change(function(e){
        let value = e.target.value

        if(value == "custom-day"){
            custom_day_class.removeClass('none')
            day_selected_input.value = ""
        }else{
            custom_day_class.addClass('none')
            custom_day_input.value = ""
            
        }
    })

// generate id
    function makeId(){
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        for ( let i = 0; i < 7; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }



    function saveEvent(){
        let event_name = event_name_input.value
        let color = color_input.value  
        let day_selected = day_selected_input.value
        let custom_day = custom_day_input.value
        let first_day = first_day_input.value
        let last_day = last_day_input.value

        if(event_name && !event_name.includes('<') && !event_name.includes('>')){

            if(multiple_days_input.checked && first_day != 0 && last_day != 0){
                console.log("dos dias")
                console.log("last day: " + last_day)
                console.log("last day: " + last_day)
    
            } else if(custom_radio.checked && custom_day != 0){
                console.log("custom_day: " + custom_day)
    
            }else if(day_selected_input.checked && day_selected == "on"){
                console.log("day_selected: " + day_selected)
    
            }else{
                swal("Vaya...", "Debes elegir alguna opción!", "warning")
            } 

        }else{
            swal("Vaya...", "Debes completar todos los campos. Intentalo de nuevo.", "warning")
        }
    }

    function closeForm(){
        event_form_container.classList.remove("active");
    }

    function newEvent() {
        event_form_container.classList.add('active');
        close_event_button.addEventListener('click', ()=>closeForm());
        save_event_button.addEventListener('click', ()=>saveEvent());
    }

    new_event_button.addEventListener('click', () => newEvent())
})
