$(document).ready(function() {

    const calendar = $('#calendar');

    calendar.evoCalendar({
        theme: 'default',
        format:'yyyy/mm/dd',
        titleFormat:'MM yyyy',
        eventHeaderFormat:'MM d, yyyy',
        'firstDayOfWeek': 1,
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

    let calendar_events = []

    

    const new_event_button = document.getElementById('new_event')
    const event_form_container = document.getElementById('event-container')
    const close_event_button = document.getElementById('close-event_button')
    const save_event_button = document.getElementById('save_event')


    // event form ids
    const event_name_input = document.getElementById('event_name')
    const event_description_input = document.getElementById('event_description')

    const color_input = document.getElementById('color')

    const day_selected_input = document.getElementById('select-day')

    const custom_radio = document.getElementById('custom-radio')
    const custom_day_input = document.getElementById('custom-day')

    const multiple_days_input = document.getElementById('multiple-days')
    const first_day_input = document.getElementById('first-day')
    const last_day_input = document.getElementById('last-day')

    const everyYear_input = document.getElementById('everyYear')
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

    function ParseBool(value) {
        if(value === "true"){
            return true;
        }else if(value === "false"){
            return false;
        }
    }

    function createEventObject(name,description,date,color,everyYear,badge){
        let obj = {
            id:makeId(),
            name,
            badge,
            description,
            date,
            type: makeId(),
            color,
            everyYear
        };

        closeForm()
        calendar_events.push(obj);
        localStorage.setItem("calendar_events",JSON.stringify(calendar_events));

        swal({title: "¡Perfecto!",
        text: "¡El evento se ha guardado con éxito!",
        icon: "success",
        buttons: false})
        setTimeout(()=>location.reload(),2000)
        
    }

    function saveEvent(){
        let event_name = event_name_input.value
        let event_description = event_description_input.value
        let color = color_input.value  
        let day_selected = day_selected_input.value
        let custom_day = (custom_day_input.value).replace(/-/g,"/")
        let first_day = (first_day_input.value).replace(/-/g,"/")
        let last_day = (last_day_input.value).replace(/-/g,"/")
        let everyYear = ParseBool(everyYear_input.value)
       

        if(event_name && !event_name.includes('<') && !event_name.includes('>')){

            if(multiple_days_input.checked && first_day != 0 && last_day != 0){
                
                if(first_day < last_day){
                    let range = [first_day, last_day]
                    let from = first_day.slice(5)
                    let since = last_day.slice(5)
                    let badge = from + ' - ' + since
                    
                    createEventObject(event_name,event_description,range,color,everyYear,badge)
                }else{
                    swal("Vaya...", "Modifica el día de finalización del evento, para que sea posterior al día inicial.", "warning")
                }
    
            } else if(custom_radio.checked && custom_day != 0){

                createEventObject(event_name,event_description,custom_day,color,everyYear)
    
            }else if(day_selected_input.checked && day_selected == "on"){

                let active_date = calendar.evoCalendar('getActiveDate');
                createEventObject(event_name,event_description,active_date,color,everyYear)
    
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


    function getEvents(){
        if(localStorage.getItem('calendar_events')){
            calendar_events = JSON.parse(localStorage.getItem('calendar_events'))
            calendar.evoCalendar('addCalendarEvent', calendar_events)
        }
    }

    new_event_button.addEventListener('click', () => newEvent())
    getEvents()

// html elements to delete events.
    let calendar_events_container = document.getElementsByClassName('calendar-events')[0]
    // creating close-button
    let close_button = document.createElement('img')
    close_button.src = "https://img.icons8.com/nolan/64/multiply.png"
    close_button.title = "Borrar Evento"
    calendar_events_container.append(close_button)

    
    close_button.addEventListener('click',()=>{
        let active_events = calendar.evoCalendar('getActiveEvents');

        if(active_events.length != 0){
            swal("Alerta!", "Preciona el evento que desees eliminar. Si el evento seleccionado es de múltiples días, se borrará en todos ellos.", "warning"); 

            // getting the event list
            let event_container = $('.event-container')
            let array = [...event_container] 

            array.forEach(element => {
                element.addEventListener('click',(e)=>{
                    swal({
                        title: "¿Estás seguro que deseas eliminar este evento?",
                        text: "Una vez eliminado, no podrás recuperarlo.",
                        icon: "warning",
                        buttons: ["Cancelar", "Acepto"],
                        dangerMode: true,
                      })

                      .then((willDelete) => {
                        //   getting the id to use it in the removeCalendarEvent
                        let id = e.path[2].dataset.eventIndex;
                        calendar.evoCalendar('removeCalendarEvent', id);

                        // getting index of the element removed from the calendar_events array, to save it into localStorage
                        let index = calendar_events.map(e => e.id).indexOf(id);
                        calendar_events.splice(index, 1);
                        localStorage.setItem("calendar_events",JSON.stringify(calendar_events));

                        if (willDelete) {
                            swal("¡El evento ha sido eliminado!", {icon: "success"});
                      } 
                    });
                })
            });

        }else{
            swal("Vaya!", "No hay ningún evento para borar en esta fecha.", "info"); 
        }    
        
    })
 
})
