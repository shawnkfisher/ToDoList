"use strict";

//globals
var database = firebase.database(); // database reference
var auth = firebase.auth(); // authentication reference

/*Start Section -- Firebase Auth/On Load*/
function login() {
    function newLoginHappened(user) {
        if (user) { //user is logged in
            loadToDoList(user); //loads toDoList
            document.getElementById("login-cover").style.display = "none";// turns off loading screen
        } else {// if user not logged in, redirect to google login
            var provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithRedirect(provider);
        }
    }
    auth.onAuthStateChanged(newLoginHappened);
}
// Logout button logs out the user
function logout() {
    auth.signOut();
}
/*End Section -- Firebase Auth/ On Load*/

function openInput() {
    document.getElementById("mdl-layout__content").style.display = "none";
    document.getElementById("enter-input").style.display = "flex";
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

    var task = document.getElementById("task").value;
    var userId = auth.currentUser.uid;
    var taskCount = 0;

    // references the TaskCount stored on firebase for current user
    var taskCountRef = database.ref('Users/' + userId + '/TaskCount/');
    taskCountRef.transaction(function (current_value) {
        return (current_value || 0) + 1; //increments TaskCount on firebase
    });

    // gets TaskCount from firebase
    taskCountRef.on("value", function(data) {
        taskCount = data.val();
    });

    if (task === '') {
        alert("You must write something!");
    } else { //set task(taskCount) to firebase (triggers on child_added event listener
        var taskRef = database.ref('Users/' + userId + '/Tasks/' + '/task' + taskCount);
        taskRef.set({
            Task: task,
            State: false //keeps track of the state of checkboxes
        });
    }
    document.getElementById("task").value = "";
}

function deleteElement(taskcount) {

}
/* End Section -- add new item to list*/

function loadToDoList(user) {
    var taskRef = database.ref('Users/' + user.uid + '/Tasks');
    var taskCountRef = database.ref('Users/' + user.uid + '/TaskCount/');
    var taskCount = 0;

    // child_added event listener
    taskRef.on("child_added", function(data) {
        var task = data.val().Task; //gets task from firebase
        taskCount++;

        // Create Elements for ToDoList
        var li = document.createElement("li");
        var span = document.createElement("span");
        var textnode = document.createTextNode(task);
        var span2 = document.createElement("span");
        var label = document.createElement("label");
        var input = document.createElement("input");
        //var span3 = document.createElement("span");
        //var icon = document.createTextNode("backspace");

        // Classes for elements
        li.className = 'mdl-list__item';
        span.className = 'mdl-list__item-primary-content ';
        label.className = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect';
        label.setAttribute("for", "list-checkbox-" + taskCount); // attempting to make checkboxes correspond with elements
        span2.className = 'mdl-list__item-secondary-action';
        input.type = 'checkbox';
        input.id = 'list-checkbox-' + taskCount; // attempting to make checkboxes correspond with elements
        input.className = 'mdl-checkbox__input';

        //Append Elements to DOM
        document.getElementById("todoList").appendChild(li);
        span.appendChild(textnode);
        li.appendChild(span);
        li.appendChild(span2);
        span2.appendChild(label);
        label.appendChild(input);
        componentHandler.upgradeDom(); //have to upgradeDom when Elements are added Dynamically

        var checkBox = document.getElementById("list-checkbox-" + taskCount);
        var key = data.key;
        var stateRef = database.ref('Users/' + user.uid + '/Task/' + key);

        // Get the status on Firebase
        stateRef.once("value", function(data) {
            var status = data.child("State").val();
            //checkBox.setAttribute('checked', status);
            if (status === true) {
                label.classList.add("is-checked");
            }
        });

        //update value, changed status of checkbox
        checkBox.addEventListener('change', function() {
            if(this.checked) {
                stateRef.update({State: true});
            } else {
                stateRef.update({State: false});
            }
        });

        // gets TaskCount from firebase
        taskCountRef.on("value", function(data) {
            taskCount = data.val();
        });

    });
}

var snackbarContainer = document.getElementById('demo-snackbar-example');
var addBtn = document.getElementById("addBtn");
var handler = function(e) {
    //remove the task
};
addBtn.addEventListener('click', function() {
    var data = {
        message: 'Task Added.',
        timeout: 2000,
        actionHandler: handler,
        actionText: 'Undo'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
});