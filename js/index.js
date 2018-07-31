"use strict";


/* Start Section -- Initialize*/
function initialize() {
    login();
    showHome();
}
// shows sign in page of the app to the user
function showHome() {
        document.getElementById('init').click();
}
/* End Section -- Initialize*/

/* Start Section -- Navigation for changing tabs */
function showTab(event, tabName) {
    // Declare all variables
    var i, tabContentElements, tabLinkElements;

    // Get all elements with class="tabContent" and hide them
    tabContentElements = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContentElements.length; i++) {
        tabContentElements[i].style.display = "none";
    }

    // Get all elements with class="tabLink" and remove the class "active"
    tabLinkElements = document.getElementsByClassName("tabLink");
    for (i = 0; i < tabLinkElements.length; i++) {
        tabLinkElements[i].className =
            tabLinkElements[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}
/* End Section -- Navigation for changing tabs */

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
    var inputValue = document.getElementById("addToList").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("todoList").appendChild(li);
    }
    document.getElementById("addToList").value = "";

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

/*Start Section -- Firebase Auth*/
// user.displayName
// user.email
// user.photoURL
// user.uid

function login() {
    function newLoginHappened(user) {
        if (user) {
            // User is signed in
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