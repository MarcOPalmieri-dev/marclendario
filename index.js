const buttonProgressBar = document.getElementById("buttonProgressBar");
const container = document.getElementsByClassName("progress-bar")[0];
const progress = document.querySelector("#progress-done");
const img_container = document.getElementById("img-container");
const goals_div = document.getElementsByClassName("goals")
const goal_container = document.getElementById("section");
const now = moment();
const month_days = (now.daysInMonth());
const name_of_month = now.format("MMMM");

const new_objetive_button = document.getElementById("new-objetive");

// Adding month to the front
const month_container = document.getElementById("month");
const month_text = document.createElement("p");
month_text.innerHTML = name_of_month;
month_container.append(month_text);

// adding values to progress bar
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

// 3 idea: se le aplica una duracion al objetivo, y si ese tiempo se pasa, que se borre.
// function change_of_month{
//     if(first_day){

//     }
// }

// Metodo para las fechas:

// crear un objeto (puede ser una clase)que contenga el div sema, y ese objeto contiene a los divs de los dias de esa semana.
// ese objeto sera guardado en un array de objetos.

class Objetives{
    constructor(){
        this.initialize()   
    }

    initialize(){
        this.array_objetives = [];
        this.new_objetive_button = new_objetive;
        this.addClickEvent()
    // this.getObjetives() Trae los objetivos que ya estan creados. Metodo que recorre un array de objetos? 
    // this.new_objetive = getElement...   Traemos el boton para crear nuevos objetivos. Luego le agregamos el eventListener con el metodo correspondiente. Va a hacer push al array de objetos de arriba, y tambien se le va a agregar como atributo el metodo del progress bar. El
    }

    addClickEvent(){
        this.new_objetive_button.addEventListener(click,this.newObjetive.bind(this));
    }

    newObjetive(){
        // le ponemos display block a un formulario emergente. Luego obtenemos los datos del formulario. Y eso lo ponemos en un objeto (quizas sea de la clase objetivo, y le modificamos las propiedades. Una de esas propiedades debe ser el valor de pixels,current-day y esos, para que se guarden los valores y no se reinicie
        // y despues con el metodo getObjetives, recorremos el array y los imprimimos.
    }
}



function startObjetives(){
    this.objetive = new Objetives();
}