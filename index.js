const myform = document.getElementById("myform");
const itemlist = document.getElementById("items");
const URL = "https://crudcrud.com/api/a62e76d389534934b821c7d7dbcb21cd/Expenses"

myform.addEventListener("submit",onsubmit);
itemlist.addEventListener("click",deleteitem);
itemlist.addEventListener("click",edititem);
window.addEventListener("DOMContentLoaded",showlist);

async function onsubmit(e){
    e.preventDefault();
    const amount = document.getElementById("amount").value;
    const desc = document.getElementById("desc").value;
    const category = document.getElementById("category").value;
    document.getElementById("amount").value = '';
    document.getElementById("desc").value = '';
    document.getElementById("category").value = '';
    // axios.post(`${URL}/`,{
    //     "amount" : amount,
    //     "desc" : desc,
    //     "category" : category
    // }).then(resp => {
    //     console.log(resp);
    //     showlist();
    // })
    // additem(amount,desc,category);
    try{
        let result = await axios.post(`${URL}/`,{ amount, desc, category });
        let show = await new Promise.resolve(showlist());
    }
    catch(e){console.log(e)};
    
}

async function showlist(){
    itemlist.innerHTML = "";
    // axios.get(URL)
    // .then(resp => {
    //     for(let i=0; i < resp.data.length; i++){
    //        additem(resp.data[i])
    //     }
    // })
    // .catch(err => console.log(err));
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
    let text = `amount=${obj.amount} description=${obj.desc} category=${obj.category}`
    li.appendChild(document.createTextNode(text));
    li.id = `${obj._id}`

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

async function deleteitem(e){
    if (e.target.classList.contains('delete')){
        let li = e.target.parentElement;
        // axios.delete(`${URL}/${li.id}`)
        // .then(resp => {
        //     console.log(resp);
        //     itemlist.removeChild(li);
        // })
        try{
            let resp = await axios.delete(`${URL}/${li.id}`);
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
        // deleting element
        let li = e.target.parentElement;
        // axios.delete(`${URL}/${li.id}`)
        // .then(resp => {
        //     console.log(resp);
        //     itemlist.removeChild(li);
        // })
        try{
            let resp = await axios.delete(`${URL}/${li.id}`);
            itemlist.removeChild(li);
        }catch(e){
            console.log(e);
        }
    }
}
