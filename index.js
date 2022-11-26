const myform = document.getElementById("myform");
const itemlist = document.getElementById("items");
const URL = "http://localhost:4000"

myform.addEventListener("submit",onsubmit);
itemlist.addEventListener("click",deleteitem);
itemlist.addEventListener("click",edititem);
window.addEventListener("DOMContentLoaded",showlist);

async function onsubmit(e){
    e.preventDefault();
    const id = document.getElementById("userid").value;
    const amount = document.getElementById("amount").value;
    const desc = document.getElementById("desc").value;
    const category = document.getElementById("category").value;
    document.getElementById("amount").value = '';
    document.getElementById("desc").value = '';
    document.getElementById("category").value = '';
    document.getElementById("userid").value = '';
    if (id === null){
        try{
            await axios.post(`${URL}/`,{ amount, desc, category });
            await Promise.resolve(showlist());
        }
        catch(e){console.log(e)};
    } else {
        try{
            await axios.post(`${URL}/${id}`,{ amount, desc, category });
            await Promise.resolve(showlist());
        }
        catch(e){console.log(e)};
    }
}

async function showlist(){
    itemlist.innerHTML = "";
    try{
        let resp = await axios.get(URL);

        for(let i=0; i < resp.data.length; i++){
            additem(resp.data[i])
        }
    }catch(e){
        console.log(e);
    }
}

function additem(obj){

    let li = document.createElement('li');
    let text = `amount=${obj.amount} description=${obj.description} category=${obj.category} `
    li.appendChild(document.createTextNode(text));
    li.id = `${obj.userid}`

    // add edit button
    let editbtn = document.createElement('button');
    editbtn.className = "btn btn.default btn.sm float-right edit";
    editbtn.appendChild(document.createTextNode("EDIT"));
    li.appendChild(editbtn);
    
    // add del button
    let delbtn = document.createElement('button');
    delbtn.className = "btn btn.danger btn.sm float-right delete";
    delbtn.appendChild(document.createTextNode("DELETE"));
    li.appendChild(delbtn);

    // append li to list
    itemlist.appendChild(li);

}

async function deleteitem(e){
    if (e.target.classList.contains('delete')){
        let li = e.target.parentElement;
        try{
            await axios.delete(`${URL}/delete/${li.id}`);
            itemlist.removeChild(li);
        }
        catch(e){
            console.log(e);
        }
    }
}

async function edititem(e){
    if (e.target.classList.contains('edit')){
        let text = e.target.parentElement.innerText;
        console.log(e.target.parentElement.id);
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
        document.getElementById("userid").value = e.target.parentElement.id;
    }
}
