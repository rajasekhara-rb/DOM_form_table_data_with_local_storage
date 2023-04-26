// targeting the form elemetns 
let table = document.querySelector("#table");
let form = document.querySelector("#form");
let tableBody = document.querySelector("#tbody");
let submitBtn = document.querySelector("#submitBtn");
let resetBtn = document.querySelector("#resetBtn");
let alertMsg = document.querySelector("#alertMsg");

// colleting the form inoput elements 

let fname = document.querySelector("#fname");
let lname = document.querySelector("#lname");
let address = document.querySelector("#address");
let pincode = document.querySelector("#pincode");
let gender = document.querySelector("#gender");
let food = document.querySelectorAll(".checkbox");
let state = document.querySelector("#state");
let country = document.querySelector("#country");

let rowArray = [];

let editing = false;

class tableFun {
    constructor(fname,
        lname,
        address,
        pincode,
        gender,
        checkedFood,
        state,
        country) {
        this.id = this.count;
        this.fname = fname;
        this.lname = lname;
        this.address = address;
        this.pincode = pincode;
        this.gender = gender;
        this.checkedFood = checkedFood;
        this.state = state;
        this.country = country;
    }
}

function UpdateTable() {
    let html = "";
    let count = 1;
    rowArray.forEach(function (element) {
        let currentElement = element;
        currentElement.id = count;
        html += `<tr>
                    <td>${currentElement.id}</td>
                    <td>${currentElement.fname}</td>
                    <td>${currentElement.lname}</td>
                    <td>${currentElement.address}</td>
                    <td>${currentElement.pincode}</td>
                    <td>${currentElement.gender}</td>
                    <td>${currentElement.checkedFood}</td>
                    <td>${currentElement.state}</td>
                    <td>${currentElement.country}</td>
                </tr>`
        count++;
    })
    tableBody.innerHTML = html;
    setLocal();
}

function changeEle(element, checkedFood) {
    element.fname = fname.value;
    element.lname = lname.value;
    element.address = address.value;
    element.pincode = pincode.value;
    element.gender = gender.value;
    element.checkedFood = checkedFood;
    element.state = state.value;
    element.country = country.value;
    editing = false;
}


form.addEventListener("submit", function (e){
    e.preventDefault();
    const checkedFood = [];
    food.forEach((f) => {
        if (f.checked == true) {
            checkedFood.push(f.value);
        }
    })
    if (checkedFood.length < 2) {
        alert("Please select atleast 2 inputs");
        return;
    }

    if (!editing) {
        const row = new tableFun(
            fname.value,
            lname.value,
            address.value,
            pincode.value,
            gender.value,
            checkedFood,
            state.value,
            country.value
        );
        rowArray.push(row);
    } else changeEle(checkedFood);
    fname.value = "";
    lname.value = "";
    address.value = "";
    pincode.value = "";
    gender.value = "";
    state.value = "";
    country.value = "";
    food.forEach((el) => (el.checked = false))

    UpdateTable();

});

function setLocal(){
    localStorage.setItem("table", JSON.stringify(rowArray));
    alertMsg.innerHTML = `<p class="alert alert-success">Data stored in local storage</p>`
    setTimeout(() => {
        alertMsg.innerHTML = "";
    }, 2000);
}

let localArray = JSON.parse(localStorage.getItem("table"));

if(localArray){
    rowArray = localArray;
    UpdateTable();
}

function reset(){
    localStorage.removeItem('table');
    alertMsg.innerHTML = `<p class="alert alert-danger">Data Deleted from the local storage</p>`
    setTimeout(() => {
        alertMsg.innerHTML = "";
        location.reload();
    }, 2000);
    

}

resetBtn.addEventListener("click", reset);
