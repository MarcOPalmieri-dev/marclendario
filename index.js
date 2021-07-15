



// Metodo para las fechas:

// crear un objeto (puede ser una clase)que contenga el div sema, y ese objeto contiene a los divs de los dias de esa semana.
// ese objeto sera guardado en un array de objetos.



// new objetive
const new_objetive_button = document.getElementById("new_objetives")

const delete_all_objetives_button = document.getElementById("delete-all-objetives")

// form ids
const objetive_form_container = document.getElementsByClassName("popup_container")[0];
const close_form = document.getElementById("close_button");
const save_objetive_button = document.getElementById("save_objetive");

// inputs to get data from Objetive form
const input_title = document.getElementById("title");
const select_icon = document.getElementById("icon");
const input_time = document.getElementById("time");

// array to save objetives
let array_objetives = [];



function closeForm(){
    objetive_form_container.style.display = "none"; 
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




const now = moment();


function progressBar(obj,time,pixels,day_completed,progress_done,img_container,goal_container,progress_container){
    
    if(time >40){
        progress_container.style.width = time * 1 + "px";
        pixels+=1;
    }else{
        progress_container.style.width = time * 5 + "px";
        pixels+=5;
    }
    
        progress_done.style.width = pixels + "px";
        day_completed++;
        progress_done.innerHTML = day_completed + "/" + time + " Días";
        obj.day_completed = day_completed;
        obj.pixels = pixels;

        if(day_completed == time){
        
            swal("¡Felicidades!", "Lograste cumplir con tu objetivo!", "success")
            img_container.src = "tick.png"
            obj.icon = 'tick.png'
            goal_container.style.opacity = 0.5;
            obj.finished = true;
            setTimeout(()=>location.reload(),3000)
        }

    // with obj argument, can modify values and save it in localStorage
    localStorage.setItem("array_objetives",JSON.stringify(array_objetives));
};





function createPushObject(title,icon,time){
    let obj = {
        title,
        icon,
        time,
        day_completed:0,
        pixels: 0, 
        finished:false  
    }
    
    array_objetives.push(obj);
    localStorage.setItem("array_objetives",JSON.stringify(array_objetives));
    swal({title: "¡Perfecto!",
    text: "El objetivo se ha guardado con éxito!",
    icon: "success",
    buttons: false})
    setTimeout(()=>location.reload(),2000)
    
}


function saveData(){
    let title_data = input_title.value;
    let icon = transformToUrl(parseInt(select_icon.value));
    // transform icon to image url
    let time_data = input_time.value;
    if(title_data && time_data){
        if(!title_data.includes('<') && !title_data.includes('>')){
            closeForm()
            createPushObject(title_data,icon,time_data);
        }else{
            swal("Opss...", "No utilices el símbolo < ni >.", "warning")
        }
    }else{
        swal("Vaya...", "Debes completar todos los campos. Intentalo de nuevo.", "warning")
    }
    
    
}



function printObjetivesLS(array){
    const section = document.querySelector(".goals")
    let fragment = document.createDocumentFragment()

    let i = 0
    for (let obj of array) {

        let obj_template = `
                <section id="section${i}" class="section">
                <div class="glassmorphism-effect img-container">     
                    <img src="${obj.icon}" id="img-container${i}"/>
                </div>
                <div class="bar-container">
                    <div id="buttonProgressBar${i}">
                        <p class="little-p">${obj.title}</p>
                        <div class="progress-bar">
                            <div id="progress-done${i}" class="progress-done"></div>
                        </div>
                    </div> 
                    <div>
                    <img src="https://img.icons8.com/nolan/64/multiply.png" alt="Cerrar" id="delete-objetive${i}"/>
                    </div>
                </div>`

                const objetive = document.createElement('div')
                objetive.innerHTML = obj_template;
                fragment.append(objetive);
                
                i++
        }
        section.append(fragment)
}


function addProgressBar(){

    let i = 0
    for (let obj of array_objetives){

        let button = document.getElementById('buttonProgressBar'+i);
        let progress_container = document.getElementsByClassName("progress-bar")[i];
        let progress_done = document.getElementById("progress-done"+i);
        let img_container = document.getElementById("img-container"+i);
        let goal_container = document.getElementById("section"+i);

        let delete_button = document.getElementById("delete-objetive"+i);

        // charging progress bar properties when printing 

            // making a conditional to avoid breaking the design with the bar.
            if(obj.time >40){
                progress_container.style.width = obj.time * 1 + "px";

            }else{
                progress_container.style.width = obj.time * 5 + "px";
            }

            progress_done.style.width = obj.pixels + "px";
            progress_done.innerHTML = obj.day_completed + "/" + obj.time + " Días";

            if(obj.finished){
                goal_container.style.opacity = 0.5;
                progress_container.style.display = "none";
            }

            
            // adding events to progress-bar and to delete-objetive
            button.addEventListener('click',function(){
                
                progressBar(obj,obj.time,obj.pixels,obj.day_completed,progress_done,img_container,goal_container,progress_container)
            })


            delete_button.addEventListener('click',function(){
                swal({
                    title: "¿Estás seguro que deseas eliminar este objetivo?",
                    text: "Una vez eliminado, no podrás recuperarlo, y perderás todo el progreso.",
                    icon: "warning",
                    buttons: ["Cancelar", "Acepto"],
                    dangerMode: true,
                  })
                  .then((willDelete) => {

                    goal_container.style.display = "none"
                    array_objetives.pop(obj)
                    localStorage.setItem("array_objetives",JSON.stringify(array_objetives));
                    
                    if (willDelete) {
                      swal("¡El objetivo ha sido eliminado!", {icon: "success"});
                    } 
                  });
            })

        i++
    }
}


// function newObjetive(array=0){
//     console.log(array)
//     objetive_form_container.style.display = "grid";
//     close_button.addEventListener('click',() =>closeForm());
//     if(array.length === 0){
        
//         save_objetive_button.addEventListener('click',()=>saveData())
//     }else{

//         printNewObjetives(array)
//         closeForm()
//     }
   
// }
function getObjetivesLS(){
    if(localStorage.getItem('array_objetives')){
        let array = JSON.parse(localStorage.getItem('array_objetives'))
        array_objetives = array;
        printObjetivesLS(array)
        addProgressBar()
    }
}



function newObjetive(){
    objetive_form_container.style.display = "grid";
    close_button.addEventListener('click',() =>closeForm());
    save_objetive_button.addEventListener('click',()=>saveData())
}



// executing functions

getObjetivesLS()

new_objetive_button.addEventListener("click",()=>newObjetive())


if(array_objetives.length > 0){
    
    delete_all_objetives_button.addEventListener("click",()=>{
        swal({
            title: "¿Estás seguro que deseas eliminar todos los objetivos?",
            text: "Una vez eliminado, no podrás recuperarlo, y perderás todo el progreso.",
            icon: "warning",
            buttons: ["Cancelar", "Acepto"],
            dangerMode: true,
          })
          .then((willDelete) => {
    
              array_objetives = []
              localStorage.clear();
              location.reload();
    
            if (willDelete) {
              swal("¡Los objetivos han sido eliminados!", {icon: "success"});
            } 
          });
    })

} else{
    delete_all_objetives_button.style.display = "none";
}


