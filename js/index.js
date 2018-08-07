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

/*Start Section -- Add new item to list*/
// when a li is clicked in a ul, run this code: Cant get firebase portion to work

/*End Section -- add new item to list*/
var myTodoList = document.getElementsByClassName("todoListItem");
var i;

// adds close button on each li
for (i = 0; i < myTodoList.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.classList.add("todoListItem");
    span.appendChild(txt);
    myTodoList[i].appendChild(span);
}

// hides the list item when close button is clicked
var close = document.getElementsByClassName("close");
var i;
for (i=0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add li when Add clicked
function newElement() {
    var li = document.createElement("li");
    var task = document.getElementById("task").value;
    var t = document.createTextNode(task);
    var firebaseRef = firebase.database().ref('Task/');

    firebaseRef.set(task);

    li.appendChild(t);
    if (task === '') {
        alert("You must write something!");
    } else {
        document.getElementById("todoList").appendChild(li);
    }
    document.getElementById("task").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.classList.add("todoListItem");
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

/* End Section -- add new item to list*/
