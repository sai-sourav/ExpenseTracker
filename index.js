const myform = document.getElementById("myform");
const itemlist = document.getElementById("items");

myform.addEventListener("submit",onsubmit);
itemlist.addEventListener("click",deleteitem);
itemlist.addEventListener("click",edititem);

function onsubmit(e){
    e.preventDefault();
    const amount = document.getElementById("amount").value;
    const desc = document.getElementById("desc").value;
    const category = document.getElementById("category").value;

    additem(amount,desc,category);
    document.getElementById("amount").value = '';
    document.getElementById("desc").value = '';
    document.getElementById("category").value = '';
}

function additem(amount,desc,category){

    let li = document.createElement('li');
    let text = `amount=${amount} description=${desc} category=${category}`
    li.appendChild(document.createTextNode(text));

    // add edit button
    let editbtn = document.createElement('button');
    editbtn.className = "btn btn.default btn.sm float-right edit";
    editbtn.appendChild(document.createTextNode("EDIT"));
    li.appendChild(editbtn);

    // add del button
    let delbtn = document.createElement('button');
    delbtn.className = "btn btn.danger btn.sm float-right delete";
    delbtn.appendChild(document.createTextNode("X"));
    li.appendChild(delbtn);

    // append li to list
    itemlist.appendChild(li);

}

function deleteitem(e){
    if (e.target.classList.contains('delete')){
        let li = e.target.parentElement;
        itemlist.removeChild(li);
    }
}

function edititem(e){
    if (e.target.classList.contains('edit')){
        let text = e.target.parentElement.innerText;
        text = text.replace('EDITX','');
        text = text.replace('amount=','');
        text = text.replace('description=','');
        text = text.replace('category=','');
        let arr = text.split(' ');
        let amount = arr[0]
        let desc = arr[1]
        let category = arr[2]
        document.getElementById("amount").value = amount;
        document.getElementById("desc").value = desc;
        document.getElementById("category").value = category;
        let li = e.target.parentElement;
        itemlist.removeChild(li);
    }
}
