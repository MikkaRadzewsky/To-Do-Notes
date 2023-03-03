loadStorage();

// Add a to-do to page
function addToDo() {

    if (!validate()) {
        return;
    }
    const toDo = getToDo();
    const allToDos = getToDoFromStorage();

    allToDos.push(toDo);
    displayToDos(allToDos, true);
    saveToDosToStorage(allToDos);

    clear();
}

//  save to-do to storage
function saveToDosToStorage(allToDos) {
    const str = JSON.stringify(allToDos);
    localStorage.setItem("toDos", str);
}

// get to-do array from storage
function getToDoFromStorage() {
    const str = localStorage.getItem("toDos");
    const toDos = (str === null) ? [] : JSON.parse(str);
    return toDos;
}

// delete a to-do from the page and from storage
function deleteToDo(toDoNoteInternalElement, index) {
    const note = toDoNoteInternalElement.parentNode
    const parentNote = note.parentNode;
    parentNote.removeChild(note);

    const allToDos = getToDoFromStorage();
    allToDos.splice(index, 1);
    saveToDosToStorage(allToDos);

    return false;
};

// display to-dos on page
function displayToDos(allToDos, isFadeIn) {
    span.innerHTML = "";

    for (const a of allToDos) {
        const index = allToDos.indexOf(a);

        const item = `<section ${index === allToDos.length - 1 && isFadeIn ? `class="fadeIn"` : ``}><br><h5> To Do :</h5> <button class="deleteButton" onclick="deleteToDo(this,${index})"><i class="fa fa-trash"></i></button>
        <div class="toDoDiv" >${a.toDo}</div><br><br><div class="dateDiv"> Finish Until: <br> ${a.date} , ${a.time}</div></section>`

        span.innerHTML += item;
    }
}

// get to-do from array
function getToDo() {
    const toDo = toDoBox.value;
    const date = dateBox.value;
    const time = timeBox.value;

    const fullToDo = {
        toDo,
        date,
        time
    };
    return fullToDo;
}

// validate all input boxes
function validate() {
    const toDos = toDoBox.value;
    const date = dateBox.value;
    const time = timeBox.value;

    if (toDos.trim() === "") {
        alert("Please enter something to do")
        toDoBox.focus();
        return false;
    }
    if (date === "") {
        alert("Please enter a valid date")
        dateBox.focus();
        return false;
    }
    if (time === "") {
        alert("Please enter a valid time")
        timeBox.focus();
        return false;
    }
    return true;
}


// clear all input boxes
function clear() {
    toDoBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    toDoBox.focus();
}

// load local storage on page
function loadStorage() {
    const allToDos = getToDoFromStorage();
    displayToDos(allToDos, false);
}

// make it impossible to select past dates
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementsByName("dateBox")[0].setAttribute('min', today);
}
