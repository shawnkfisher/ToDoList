"use strict";

//globals
var taskRef = firebase.database().ref('Task/');

/*Start Section -- Firebase Auth/On Load*/
function login() {
    function newLoginHappened(user) {
        if (user) {
            // loads the ToDoList
            taskRef.on("child_added", function(snapshot) {
                var task = snapshot.val().Task;

                // Create Elements for ToDoList
                var li = document.createElement("li");
                var span = document.createElement("span");
                var textnode = document.createTextNode(task);
                var span2 = document.createElement("span");
                var label = document.createElement("label");
                var input = document.createElement("input");

                // Classes for elements
                li.className = 'mdl-list__item';
                span.className = 'mdl-list__item-primary-content';
                label.className = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect';
                label.setAttribute("for", "list-checkbox-1");
                span2.className = 'mdl-list__item-secondary-action';
                input.type = 'checkbox';
                input.id = 'list-checkbox-1';
                input.className = 'mdl-checkbox__input';

                //Append Elements to DOM
                document.getElementById("todoList").appendChild(li);
                span.appendChild(textnode);
                li.appendChild(span);
                li.appendChild(span2);
                span2.appendChild(label);
                label.appendChild(input);
                componentHandler.upgradeDom(); //have to upgradeDom when Elements are added Dynamically
            });
            // turns off loading screen
            document.getElementById("login-cover").style.display = "none";
        } else {
            // if user not logged in, redirect to google login
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    }
    firebase.auth().onAuthStateChanged(newLoginHappened);
}
// Logout button logs out the user
const btnLogout = document.getElementById('btnLogout');
btnLogout.addEventListener('click', e=> {
    firebase.auth().signOut();
});
/*End Section -- Firebase Auth/ On Load*/

/* Start Section -- add new item to ToDolist*/
function newElement() {
    var task = document.getElementById("task").value;

    // check if input is empty
    if (task === '') {
        alert("You must write something!");
    } else {

        // Push new task to firebase
        taskRef.push({
            Task: task
        });
    }
}
/* End Section -- add new item to list*/