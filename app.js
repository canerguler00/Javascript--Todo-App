const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeletAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let alert = document.getElementById("alert")
let items ;

//load items
loadItems();

//eventlistener
eventListeners();

function eventListeners(){
    //submit event
    form.addEventListener("submit", addNewItem)

    //delete item
    taskList.addEventListener("click", deleteItem)

    //delete all
    btnDeletAll.addEventListener("click", deleteAllItem)
}

function loadItems(){
    items = getItemsfromLS();

    items.forEach(function(item){
        createItem(item);
    })
}

//get items from Local Storage
function getItemsfromLS(){
    if(localStorage.getItem("items")===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem("items"))
    }
    return items;
}

//set items to Local Storage
function setItemToLS(text){
    items = getItemsfromLS();
    items.push(text);
    localStorage.setItem("items", JSON.stringify(items))
}

//delete item from Local Storage
function deleteItemFromLS(text){
    items = getItemsfromLS();
    items.forEach(function(item, index){
        if(item === text){
            items.splice(index, 1)
        }
       
    })
    localStorage.setItem("items", JSON.stringify(items))
}

function createItem(text){
    //create li
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary"
    li.appendChild(document.createTextNode(text))

    //create a
    const a = document.createElement("a");
    a.classList = "delete-item float-end";
    a.setAttribute("href", "#");
    a.innerHTML = `<i class="bi bi-trash-fill"></i>`

    //add a to li
    li.appendChild(a);

    taskList.appendChild(li);
}

function addNewItem(e){
    if(input.value === ""){        
        alert.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Alert: <span>  </span></strong> Add a New Item
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`        
    }

    if(input.value){
         //create item
    createItem(input.value);

    //save to LS
    setItemToLS(input.value)

    //clear input
    input.value = "";

    alert.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Success: <span>  </span></strong> Added a New Item
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
    }  

    // console.log(li);
    e.preventDefault()
};

function deleteItem(e){  
    
    if(e.target.className === `bi bi-trash-fill`){
        if(confirm("Are You Sure?")){
            e.target.parentElement.parentElement.remove();

            //delete from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent)
            alert.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success: <span>  </span></strong> Deleted a Item
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
        }        
    }
    e.preventDefault();

}

function deleteAllItem(e){
   if( confirm("Are you sure")){
    taskList.innerHTML = ""
   }
   localStorage.clear()
    e.preventDefault()

    alert.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Success: <span>  </span></strong> Deleted All Items
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}