const buttonProgressBar = document.getElementById("buttonProgressBar");
const container = document.getElementsByClassName("progress-bar")[0];
const progress = document.querySelector("#progress-done");
const now = moment();

let pixels = 0;
let days = 31 * 2;
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
        
    }else{
        pixels+=2;
        progress.style.width = pixels + "px";
        current_day++;
        day_comlpleted++;
        progress.innerHTML = day_comlpleted + "/" + "31 Días";

    }
}






