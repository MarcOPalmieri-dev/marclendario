

// Adding month to the front
// const name_of_month = now.format("MMMM");
// const month_container = document.getElementById("month");
// const month_text = document.createElement("p");
// month_text.innerHTML = name_of_month;
// month_container.append(month_text);

// adding values to progress bar
// let pixels = 0;
// let days = month_days * 2;
// let day_comlpleted = 0;
// let current_day = now.format('D');
// let next_day = (parseInt(now.format('D'))+1);



// Metodo para las fechas:

// crear un objeto (puede ser una clase)que contenga el div sema, y ese objeto contiene a los divs de los dias de esa semana.
// ese objeto sera guardado en un array de objetos.




const new_objetive_button = document.getElementById("new_objetives")

// form ids
const objetive_form = document.getElementById("objetive_form");
const close_form = document.getElementById("close_button");
const save_objetive_button = document.getElementById("save_objetive");

// inputs to get data from Objetive form
const input_title = document.getElementById("title");
const select_icon = document.getElementById("icon");
const input_time = document.getElementById("time");

// array to save objetives
let array_objetives = [];



function closeForm(){
    objetive_form.style.display = "none"; 
    input_title.value = "";
    input_time.value = "";
}


function transformToUrl(value){

    switch(value){
        case 1:
            return "https://img.icons8.com/nolan/64/love-book.png"
        
        case 2:
            return "https://img.icons8.com/nolan/64/dumbbell.png"

        case 3:
            return "https://img.icons8.com/nolan/64/saving-book.png"

        case 4:
            return "https://img.icons8.com/nolan/64/my-homework.png"

        case 5:
            return "https://img.icons8.com/nolan/64/housekeeping.png"
        
        case 6:
            return "https://img.icons8.com/nolan/64/editing-icons-align-text-left.png"
    }
}


const buttonProgressBar = document.getElementById("buttonProgressBar");

const progress = document.querySelector("#progress-done");
const img_container = document.getElementById("img-container");
const goals_div = document.getElementsByClassName("goals")
const goal_container = document.getElementById("section");
const now = moment();
const month_days = (now.daysInMonth());


// let pixels = 0;
// let days = month_days * 2;
// let day_comlpleted = 0;
// let current_day = now.format('D');
// console.log(current_day);
let next_day = (parseInt(now.format('D'))+1);

function progressBar(current_day,days,pixels,current_day,day_completed){
    console.log("click")
    if (current_day === next_day){
        swal("¡Suficiente por hoy!", "Vuelve mañana para cumplir tu objetivo nuevamente", "warning")
    }else{
        incressPorcentage(days,pixels,current_day,day_completed)
    }
};


function incressPorcentage(days,pixels,current_day,day_completed){
    const container = document.getElementsByClassName("progress-bar");
    container.style.width = days + "px";
    if(pixels === days){
        swal("¡Felicidades!", "Lograste cumplir con tu objetivo!", "success")
        img_container.style.backgroundImage = "url('tick.png')";
        goal_container.style.opacity = 0.5;
        
    }else{
        pixels+=2;
        progress.style.width = pixels + "px";
        current_day++;
        day_completed++;
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

function createPushObject(title,icon,time){
    let obj = {
        title,
        icon,
        time,
        current_day:now.format('D'),
        day_completed:0,
        pixels: 0,
        
        // funcion (agrupar las varibles y la funcion de progress bar) que tome como parametro "time" para pasarselo a pixels. 
        // progress_bar: buttonProgressBar.addEventListener("click",progressBar(this.current_day,this.time,this.pixels,this.current_day,this.day_completed))
        
    }
    
    array_objetives.push(obj);
    localStorage.setItem("array_objetives",JSON.stringify(array_objetives));
    
}


function saveData(){
    let title_data = input_title.value;
    let icon = transformToUrl(parseInt(select_icon.value));
    // transform icon to image url
    let time_data = input_time.value;
    closeForm()
    createPushObject(title_data,icon,time_data);
    // printNewObjetives(array_objetives)
    // title_data = 0;
    // icon = 0;
    // time_data = 0;
    swal("¡Perfecto!", "El objetivo se ha guardado con éxito!", "success")
}


function printNewObjetives(array){

    const section = document.querySelector(".goals")
    let obj = array[array.length - 1]
//   print only the new object. If I had used a "for of", it would have printed the whole array again. 
    let obj_template = `
            <section id="section${array.length}" class="section">
            <div id="img-container" class="glassmorphism-effect img-container">     
            <img src="${obj.icon}"/>
            </div>
            <div id="buttonProgressBar${array.length}">
            <p class="little-p">${obj.title}</p>
            <div class="progress-bar">
            <div id="progress-done${array.length}" class="progress-done"></div>
            </div>
            </div> `

    const objetive = document.createElement('div')
    objetive.innerHTML = obj_template;
    section.appendChild(objetive)
}


function printObjetivesLS(array){
    const section = document.querySelector(".goals")
    
    for (const obj of array) {
        
        let obj_template = `
                <section id="section${array.length}" class="section">
                <div id="img-container" class="glassmorphism-effect img-container">     
                <img src="${obj.icon}"/>
                </div>
                <div id="buttonProgressBar${array.length}">
                <p class="little-p">${obj.title}</p>
                <div class="progress-bar">
                <div id="progress-done${array.length}" class="progress-done"></div>
                </div>
                </div> `
                const objetive = document.createElement('div')
                objetive.innerHTML = obj_template;
                section.appendChild(objetive)
    }

}


function newObjetive(array=0){
    objetive_form.style.display = "flex";
    close_button.addEventListener('click',() =>closeForm());
    if(array_objetives.length === 0){
        
        save_objetive_button.addEventListener('click',()=>{
            saveData()
            printNewObjetives(array_objetives)
        })
    }else{
        printNewObjetives(array)
        closeForm()
    }
   
}

// function newObjetive(){
//     objetive_form.style.display = "flex";
//     close_button.addEventListener('click',() =>closeForm());
//     save_objetive_button.addEventListener('click',()=>saveData())
// }

new_objetive_button.addEventListener("click",()=>newObjetive())




function getObjetivesLS(){
    if(localStorage.getItem('array_objetives')){
        let lsArray = JSON.parse(localStorage.getItem('array_objetives'))
        array_objetives = lsArray
        printObjetivesLS(lsArray)
    }

}

getObjetivesLS()