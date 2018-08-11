"use strict";

/*Start Section -- Firebase Auth*/
// user.displayName
// user.email
// user.photoURL
// user.uid

function login() {
    function newLoginHappened(user) {
        if (user) {
            document.getElementById("login-cover").style.display = "none";
        } else {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    }
    firebase.auth().onAuthStateChanged(newLoginHappened);
}

const btnLogout = document.getElementById('btnLogout');
btnLogout.addEventListener('click', e=> {
    firebase.auth().signOut();
});
/*End Section -- Firebase Auth*/

/* Start Section -- add new item to list*/
function newElement() {
    var li = document.createElement("li");
    var span = document.createElement("span");
    var task = document.getElementById("task").value;
    var textnode = document.createTextNode(task);
    var firebaseRef = firebase.database().ref('Task/');

    firebaseRef.set(task);

    li.className = 'mdl-list__item';
    span.className = 'mdl-list__item-primary-content';
    span.appendChild(textnode);

    if (task === '') {
        alert("You must write something!");
    } else {
        li.appendChild(span);
        document.getElementById("todoList").appendChild(li);
    }
    document.getElementById("task").value = "";

    var span2 = document.createElement("span");
    var label = document.createElement("label");
    var input = document.createElement("input");

    label.className = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect';
    label.setAttribute("for", "list-checkbox-2");
    span2.className = 'mdl-list__item-secondary-action';
    input.type = 'checkbox';
    input.id = 'list-checkbox-2';
    input.className = 'mdl-checkbox__input';

    li.appendChild(span2);
    span2.appendChild(label);
    label.appendChild(input);
    //componentHandler.upgradeElement(label);
    componentHandler.upgradeDom(); //have to upgradeDom when Elements are added Dynamically
}

/* End Section -- add new item to list*/