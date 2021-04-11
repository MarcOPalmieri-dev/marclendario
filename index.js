const buttonProgressBar = document.getElementById("buttonProgressBar");
const container = document.getElementsByClassName("progress-bar")[0];
const progress = document.querySelector("#progress-done");

let pixels = 0;

let current_day = 15;

let next_day = 16;
// este valor se obtiene x metodo de capturar dia

buttonProgressBar.addEventListener("click",function(){

    if (current_day === next_day){
        alert("Espera hasta el siguiente día para realizar la acción nuevamente");
    }else{
        incressPorcentage()
    }
});


function addProgressClick(){
    buttonProgressBar.addEventListener("click",incressPorcentage);
}

function removeProgressClick(){
    buttonProgressBar.removeEventListener("click", incressPorcentage);
}

function incressPorcentage(){
    let days = 31 * 2;
// ejemplo
    container.style.width = days + "px";
    if(pixels === days){
        alert("terminaste el objetivo")
        
    }else{
        pixels+=2;
        progress.style.width = pixels + "px";
        current_day++;
        
    }
}


// metodo de la barra de porcentaje:

// capturar click del div contenedor,

// on click, capturar días que tiene el mes, * 2. (sera el valor final del width del progress-container) Esto se realizara cuando se cree el objetivo

// establecer la variable de porcentaje = 0
// on click, variable de porcentaje aumentará 2. (como se multiplica valor mes * 2, esto tambien hay que multiplicarlo). 
// Sí porcentje == mes, fin del metodo click. 
// aplicar sylte.width = porcentaje + %

