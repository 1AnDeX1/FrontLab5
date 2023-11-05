let myForm = document.forms.main;
let inputs = myForm.elements;

const myButton = myForm.myButton;

const phonePattern = /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
const idCardPattern = /^[A-Za-zА-ЯІЇЄҐа-яіїєґ]{2} №\d{6}$/;
const dobPattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19\d{2}|20[0123]\d)$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const pibPattern = /^([А-ЩЬЮЯЇІЄҐа-щьюяїієґA-Za-z]+\s)+[А-ЩЬЮЯЇІЄҐа-щьюяїієґA-Za-z]{1}\.[А-ЩЬЮЯЇІЄҐа-щьюяїієґA-Za-z]{1}\.$/;

const pibdata = document.getElementById("pibdata");
const phonedata = document.getElementById("phonedata");
const idCarddata = document.getElementById("idCarddata");
const dateOfBirthdata = document.getElementById("dateOfBirthdata");
const emaildata = document.getElementById("emaildata");


myForm.addEventListener("submit", (e) => {
    e.preventDefault();

    var pib = myForm.elements["pib"].value;
    var phone = myForm.elements["phone"].value;
    var idCard = myForm.elements["idCard"].value;
    var dob = myForm.elements["dateOfBirth"].value;
    var email = myForm.elements["email"].value;

    if (pibPattern.test(pib)) {
        pibdata.textContent = pib;
        hideError(myForm.elements["pib"]);
    } else {
        showError(myForm.elements["pib"], "Будь ласка, введіть у форматі ТТТТТТ Т.Т.");
        pibdata.textContent = "";
    }

    if (phonePattern.test(phone)) {
        phonedata.textContent = phone;
        hideError(myForm.elements["phone"]);
    } else {
        showError(myForm.elements["phone"], "Будь ласка, введіть у форматі (ЧЧЧ)-ЧЧЧ-ЧЧ-ЧЧ.");
        phonedata.textContent = "";
    }

    if (idCardPattern.test(idCard)) {
        idCarddata.textContent = idCard;
        hideError(myForm.elements["idCard"]);
    } else {
        showError(myForm.elements["idCard"], "Будь ласка, введіть у форматі ТТ №ЧЧЧЧЧЧ (Т-буква, Ч-число).");
        idCarddata.textContent = "";
    }
    if (dobPattern.test(dob)) {
        dateOfBirthdata.textContent = dob;
        hideError(myForm.elements["dateOfBirth"]);
    } else {
        showError(myForm.elements["dateOfBirth"], "Будь ласка, введіть у форматі ЧЧ.ЧЧ.ЧЧЧЧ.");
        dateOfBirthdata.textContent = "";
    }
    if (emailPattern.test(email)) {
        emaildata.textContent = email;
        hideError(myForm.elements["email"]);
    } else {
        showError(myForm.elements["email"], "Будь ласка, введіть у форматі тттттт@ттттт.com.");
        emaildata.textContent = "";
    }
})

function showError(inputElement, message) {
    let errorDiv = inputElement.nextSibling;

    if (errorDiv && errorDiv.classList && errorDiv.classList.contains("newDiv")) {
        inputElement.parentNode.removeChild(errorDiv);
    }

    errorDiv = document.createElement("div");
    errorDiv.textContent = message;
    errorDiv.classList = "newDiv";
    inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
}
function hideError(inputElement) {
    if (inputElement.nextElementSibling && inputElement.nextElementSibling.classList.contains("newDiv")) {
        inputElement.nextElementSibling.remove();
    }
}



for (const input of inputs) {
    let inputPlaceholder = input.placeholder;

    input.addEventListener("focus", function(){
        input.placeholder = "";
    });
    
    input.addEventListener("blur", function(){
        input.placeholder = inputPlaceholder;
    });
}


const table = document.getElementById("myTable");
let selectedCell = null;

for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 6; j++) {
        const cell = document.createElement("td");
        cell.textContent = i * 6 + (j + 1); 
        cell.addEventListener("mouseover", changeRandomColor);
        cell.addEventListener("click", showColorPicker);
        cell.addEventListener("dblclick", changeColumnColors);
        row.appendChild(cell);
    }
    table.appendChild(row);
}

function changeRandomColor(event) {
    if (parseInt(event.target.textContent) === 9) {
        event.target.style.backgroundColor = getRandomColor();
    }
}

function showColorPicker(event) {
    
    if ( parseInt(event.target.textContent) === 9) {
        event.preventDefault();
        selectedCell = event.target;
        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.addEventListener("input", changeColor);
        colorPicker.click();
    }
}


function changeColor(event) {
    if (selectedCell && parseInt(selectedCell.textContent) === 9) {
        selectedCell.style.backgroundColor = event.target.value;
    }
}

function changeColumnColors(event) {
    if (parseInt(event.target.textContent) === 9) {
        const columnIndex = event.target.cellIndex;
        const rows = table.rows;

        for (let i = 0; i < rows.length; i++) {
            const cell = rows[i].cells[columnIndex];
            if (cell && i % 2 === 1) {
                cell.style.backgroundColor = getRandomColor();
            }
        }

        event.target.style.backgroundColor = getRandomColor();
    }
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



