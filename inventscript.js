let current_slot = null;
let status_click = false;
let current_itemId = null;
let current_itemType = null;
let current_itemValue = null;
let bloquearSlotCalled = false;


// document.addEventListener("contextmenu", function(e) {
//   e.preventDefault();
// });


let body = document.getElementsByTagName('body');

const items = document.querySelectorAll('.item');

items.forEach((item) => {
  item.addEventListener('click', moveItem);
  item.addEventListener('contextmenu', moveItem);
  item.setAttribute('draggable', false);
});

function moveItem() {
  
  event.preventDefault();

  
  const item = this;






  let ghostItem = item.cloneNode(true);

 

  ghostItem.setAttribute('class', 'ghostItem');
  item.classList.add('invisible');

  let shiftX = ghostItem.getBoundingClientRect().left + 20;
  let shiftY = ghostItem.getBoundingClientRect().top + 20;

  ghostItem.style.position = 'absolute';
  ghostItem.style.zIndex = 1000;
  document.body.append(ghostItem);

  ghostItem.onclick = function (event) {

    bloquearSlotCalled = false;



    document.getElementById("nadaElmo1").style.visibility='hidden';   


    document.getElementById("nadaArma1").style.visibility='hidden';  


    document.getElementById("nadaArmadura1").style.visibility='hidden';   


    document.getElementById("nadaOffhand1").style.visibility='hidden';  




    if (current_itemId && current_itemId != item.parentNode.id) {
      let area = document.getElementById(current_itemId);
      let free_space = !!!area.firstElementChild;
      if (free_space) {
        area.append(item);
      } else if (current_itemType == item.id) {
        let destiny = area.firstElementChild.lastElementChild.innerHTML;
        let origin = item.lastElementChild.innerHTML;
        let total = parseInt(destiny) + parseInt(origin);
        area.firstElementChild.lastElementChild.innerHTML = total;
        item.remove();
      } else {
        item.parentNode.append(area.firstElementChild);
        area.append(item);
      }
    }

    item && item.classList.remove('invisible');
    ghostItem.remove();
    status_click = !status_click;
  };

  ghostItem.oncontextmenu = function (event) {
    event.preventDefault();
    if (current_itemId && current_itemId != item.parentNode.id) {
      let area = document.getElementById(current_itemId);
      let free_space = !!!area.firstElementChild;
      if (free_space) {
        let newItem = item.cloneNode(true);
        newItem.addEventListener('click', moveItem);
        newItem.addEventListener('contextmenu', moveItem);
        newItem.setAttribute('draggable', false);
        if (parseInt(item.lastElementChild.innerHTML) == 1) {
          ghostItem.remove();
          status_click = !status_click;
          item.remove();
        } 
        
        else {
          item.lastElementChild.innerHTML =
            parseInt(item.lastElementChild.innerHTML) - 1;
          ghostItem.lastElementChild.innerHTML =
            parseInt(ghostItem.lastElementChild.innerHTML) - 1;


           
        }
        newItem.lastElementChild.innerHTML = 1;
        area.append(newItem);
        newItem.classList.remove('invisible');
      } else if (current_itemType == item.id) {
   


        if (parseInt(item.lastElementChild.innerHTML) == 1) {




          ghostItem.remove();
          status_click = !status_click;
          item.remove();
        }
        let destiny = parseInt(
          area.firstElementChild.lastElementChild.innerHTML
        );
        let origin = parseInt(item.lastElementChild.innerHTML);
        let ghost = parseInt(ghostItem.lastElementChild.innerHTML);

        area.firstElementChild.lastElementChild.innerHTML = destiny + 1;
        item.lastElementChild.innerHTML = origin - 1;
        ghostItem.lastElementChild.innerHTML = ghost - 1;


        
      }
    }
  };

  status_click = !status_click;




  if (status_click) {
   
   
    
    moveAt(event.pageX, event.pageY);
    
  }

  function moveAt(pageX, pageY) {
    ghostItem.style.left = pageX - shiftX + 'px';
    ghostItem.style.top = pageY - shiftY + 'px';

  }

  function onMouseMove(event) {
    
 





    
   
      if (status_click) {


        
 

//acho que o if tem que ta aqui 

     
      moveAt(event.pageX, event.pageY);




    }
    ghostItem.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    ghostItem.hidden = false;
    

 

    if (!elemBelow) return;
    let droppableBelow = elemBelow.closest('.slot');
    if (current_slot != droppableBelow) {
      if (current_slot) {
        leaveDroppable(current_slot);
       

       



      }
      current_slot = droppableBelow;
      if (current_slot) {


        enterDroppable(current_slot);
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);
}




function enterDroppable(elem) {
  
  current_itemId = elem.id;
  if (elem.firstElementChild) {
    current_itemType = elem.firstElementChild.id;
    child = elem.firstElementChild;
    if (child && child.lastElementChild) {
      current_itemValue = child.lastElementChild.innerHTML;
    }
  }
  
  if (status_click === true && bloquearSlotCalled === false) {
    bloquearSlot(child.childNodes[1].className);

  }
}




function bloquearSlot(desbloquear){


  bloquearSlotCalled = true;

   


    
      document.getElementById("nadaElmo1").style.visibility='visible';   

    
      document.getElementById("nadaArma1").style.visibility='visible';  

    
      document.getElementById("nadaArmadura1").style.visibility='visible';   

    
      document.getElementById("nadaOffhand1").style.visibility='visible';  





  if(desbloquear === "elmo"){
    
    document.getElementById("nadaElmo1").style.visibility='hidden';   

  }

  if(desbloquear === "arma"){
    
    document.getElementById("nadaArma1").style.visibility='hidden';   

  }

      if(desbloquear === "armadura"){
    
      document.getElementById("nadaArmadura1").style.visibility='hidden';   

}

if(desbloquear === "Offhand"){
    
  document.getElementById("nadaOffhand1").style.visibility='hidden';   

}



//bloquearSlotCalled = false;


}











function leaveDroppable(elem) {

  pegouelemento = 0
 
  current_itemId = null;
  current_itemType = null;
  current_itemValue = null;
  free_space = false;




}
//                  alma, elmo, arma, offhand, armadura, bota 
// addItem("garmor", 1,0,0,0,0,1,0);
// addItem("clerigo", 1,1,0,0,0,0,0);
//          
function botao(){
  addItem("goldenarmor", 1,"armadura","Armadura de ouro +3");
  addItem("guerreiro", 1,"alma","Alma de Guerreiro 80 de HP");
  addItem("mago", 1,"alma","Alma de Mago 50 de HP");
  addItem("diamondSword", 1,"arma","Espada de diamante +2");
  addItem("goldenBoots", 1,"Bota","Bota de Ouro +3");
  addItem("goldenHelmet", 1,"elmo","Elmo de ouro +3");
  addItem("wShield", 1,"Offhand","Escudo de Madeira +1");

  
  
  
  
// addItem("clerigo", 1);
// addItem("guerreiro", 1);
// addItem("ladino", 1);
// addItem("mago", 1);
// addItem("monge", 1);
// addItem("vampiro", 1);

/*
let existingDiv = document.getElementById("0");
let newDiv = document.createElement("div");
newDiv.className = "item";
newDiv.id = "wood";
newDiv.draggable = "false";
let image = document.createElement("img");
image.src = "itens/wood.png";
let div = document.createElement("div");
div.className = "number";
div.textContent = "33";
newDiv.appendChild(image);
newDiv.appendChild(div);
existingDiv.appendChild(newDiv);
*/
}


function addItem(id, quantity, tipo, descri) {
    let emptySlots = document.querySelectorAll('.slot:empty');
    if (emptySlots.length > 0) {
        let newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.id = id;
        newItem.innerHTML = `<img src="itens/${id}.png" alt="${id}">`;
   

    let tipoDiv = document.createElement("div");
    tipoDiv.classList.add(tipo);
    tipoDiv.innerHTML = descri;
    newItem.appendChild(tipoDiv);

     let quantityDiv = document.createElement("div");
        quantityDiv.classList.add("quantity");
        quantityDiv.innerHTML = quantity;
        newItem.appendChild(quantityDiv);
		quantityDiv.className = "number"; //awe

        emptySlots[0].appendChild(newItem);
        newItem.addEventListener('click', moveItem);
        newItem.addEventListener('contextmenu', moveItem);
        newItem.setAttribute('draggable', false);
    } else {
        console.log("All slots are full.");
    }
}


function removerItem() {
  let lixo = document.getElementById("lixo");
  let item = lixo.firstElementChild;

  if (item) {
    if (confirm("Tem certeza que deseja excluir esse item?")) {
      item.remove();
    }
  } else {
    alert("Não há itens na lixeira para serem removidos!");
  }
}
