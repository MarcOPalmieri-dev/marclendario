const buttonProgressBar = document.getElementById("buttonProgressBar");
const container = document.getElementsByClassName("progress-bar")[0];
const progress = document.querySelector("#progress-done");
const img_container = document.getElementById("img-container");
const goal_container = document.getElementById("section");
const now = moment();
const month_days = (now.daysInMonth());
const name_of_month = now.format("MMMM");

// Adding month to the front
const month_container = document.getElementById("month");
const month_text = document.createElement("p");
month_text.innerHTML = name_of_month;
month_container.append(month_text);

let pixels = 0;
let days = month_days * 2;
let day_comlpleted = 0;
let current_day = now.format('D');
let next_day = (parseInt(now.format('D'))+1);

buttonProgressBar.addEventListener("click",function(){

    if (current_day === next_day){
        swal("¡Suficiente por hoy!", "Vuelve mañana para cumplir tu objetivo nuevamente", "warning")
    }else{
        incressPorcentage()
    }
});


function incressPorcentage(){
    
    container.style.width = days + "px";
    if(pixels === days){
        swal("¡Felicidades!", "Lograste cumplir con tu objetivo!", "success")
        img_container.style.backgroundImage = "url('tick.png')";
        goal_container.style.opacity = 0.5;
        
    }else{
        pixels+=2;
        progress.style.width = pixels + "px";
        current_day++;
        day_comlpleted++;
        progress.innerHTML = day_comlpleted + "/" + month_days + " Días";
        // if = current day = 1 : rest_days == only month (30 / 31); but else, rest_days == days left to finish the month
    }
}

// crear metodo para crear los objetivos.
// 1 idea: el div contenedor cambie si el mes cambia, eliminando todos los objetivos.
// 2 idea: preguntar cuanto durara el objetivo, y modificar el (month_days) del metodo incressPorcentage



// Metodo para las fechas:

// crear un objeto (puede ser una clase)que contenga el div sema, y ese objeto contiene a los divs de los dias de esa semana.
// ese objeto sera guardado en un array de objetos.