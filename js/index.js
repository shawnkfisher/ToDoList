"use strict";

//globals
const database = firebase.database(); // database reference
const auth = firebase.auth(); // authentication reference
let taskCount = 0; // keeps track of current task

/*Start Section -- Firebase Auth/On Load*/
function login() {
    function newLoginHappened(user) {
        if (user) { //user is logged in
            loadToDoList(user); //loads toDoList
            document.getElementById("login-cover").style.display = "none";// turns off loading screen
        } else {// if user not logged in, redirect to google login
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithRedirect(provider);
        }
    }
    auth.onAuthStateChanged(newLoginHappened);
}
// Logout button logs out the user
function logout() {
    auth.signOut();
}

function loadToDoList(user) {
    const taskRef = database.ref('Users/' + user.uid + '/Tasks');
    const taskCountRef = database.ref('Users/' + user.uid + '/TaskCount');
    taskCountRef.on("value", function(data) {
        taskCount = data.val();
    });
    taskRef.once('value', function (data) {
        data.forEach(function(snap) {
            const task = snap.val().Task; //gets task from firebase
            makeElement(user.uid, task, snap.key);
        });
    });
}

/*End Section -- Firebase Auth/ On Load*/

function openInput() {
    document.getElementById("mdl-layout__content").style.display = "none";
    document.getElementById("enter-input").style.display = "flex";
    document.getElementById("task").focus();
}

document.getElementById('task').addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("addBtn").click();
    }
});

function closeInput() {
    document.getElementById("mdl-layout__content").style.display = "inline-block";
    document.getElementById("enter-input").style.display = "none";
    document.getElementById("task").value = "";
}

/* Start Section -- add new item to ToDolist*/
function newElement() {
    document.getElementById("mdl-layout__content").style.display = "inline-block";
    document.getElementById("enter-input").style.display = "none";

    let task = document.getElementById("task").value;
    const userId = auth.currentUser.uid;

    // references the TaskCount stored on firebase for current user
    const taskCountRef = database.ref('Users/' + userId + '/TaskCount/');
    taskCountRef.transaction(function (current_value) {
        return (current_value || 0) + 1; //increments TaskCount on firebase
    });

    // gets TaskCount from firebase
    taskCountRef.on("value", function(data) {
        taskCount = data.val();
    });

    const setTaskRef = database.ref('Users/' + userId + '/Tasks/' + taskCount);

    if (task === '') {
        alert("You must write something!");
    } else { //set task(taskCount) to firebase (triggers on child_added event listener
        setTaskRef.set({
            Task: task,
            State: false
        });
    }

    const taskRef = database.ref('Users/' + userId + '/Tasks');

    taskRef.on("value", function() {
        makeElement(userId, task, taskCount);
        taskRef.off();
    });
    document.getElementById("task").value = "";
}

function deleteElement(taskNum) {
    const userId = auth.currentUser.uid;
    database.ref('Users/' + userId + '/Tasks/' + taskNum).remove();// remove from firebase
    document.getElementById("task" + taskNum).style.display = "none";// hide on dom
}
/* End Section -- add new item to list*/

/* Start Section -- snackbar*/
const snackbarContainer = document.getElementById('demo-snackbar-example');
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener('click', function() {
    const data = {
        message: 'Task Added.',
        timeout: 2000,
        actionHandler: handler,
        actionText: 'Undo'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
});

const handler = function() {
    let taskCount = 0;
    const userId = auth.currentUser.uid;
    const taskCountRef = database.ref('Users/' + userId + '/TaskCount/');
    taskCountRef.on("value", function(data) {
        taskCount = data.val();
    });
    deleteElement(taskCount);
};
/* End Section -- snackbar*/

function makeElement(userId, task, taskNum) {
    // Create Elements for ToDoList
    const li = document.createElement("li");
    const span = document.createElement("span");
    const taskNode = document.createTextNode(task);
    const span2 = document.createElement("span");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const i = document.createElement("i");
    const icon = document.createTextNode("clear");

    // Classes for elements
    li.className = 'mdl-list__item';
    li.id = 'task'+ taskNum;
    span.className = 'mdl-list__item-primary-content ';
    label.className = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect';
    label.setAttribute("for", "list-checkbox-" + taskNum);
    span2.className = 'mdl-list__item-secondary-action';
    input.type = 'checkbox';
    input.id = 'list-checkbox-' + taskNum;
    input.className = 'mdl-checkbox__input';
    i.className = 'material-icons md-24';

    //Append Elements to DOM
    document.getElementById("todoList").appendChild(li);
    li.innerHTML = '<button id="taskBtn' + taskNum +'" onclick="deleteElement('+ taskNum + ')" class="close mdl-button mdl-js-button mdl-js-ripple-effect" />';
    const btn = document.getElementById('taskBtn' + taskNum);
    btn.appendChild(i);
    i.appendChild(icon);
    span.appendChild(taskNode);
    li.appendChild(span);
    li.appendChild(span2);
    span2.appendChild(label);
    label.appendChild(input);


    const stateRef = database.ref('Users/' + userId+ '/Tasks/' + taskNum);
    const checkBox = document.getElementById("list-checkbox-" + taskNum);

    //update value, changed status of checkbox
    checkBox.addEventListener('change', function() {
        if(this.checked) {
            stateRef.update({State: true});
        } else {
            stateRef.update({State: false});
        }
    });
    // gets state of checkbox from firebase
    stateRef.once("value", function(data) {
        const state = data.child("State").val();
        if (state === true) {
            label.MaterialCheckbox.check();
        }
    });
    componentHandler.upgradeDom(); //have to upgradeDom when Elements are added Dynamically

}