"use strict";
/* Start Section -- Initialize*/
function initialize() {
    showSignIn();
}
// shows sign in page of the app to the user
function showSignIn() {
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
var myTodoList = document.getElementsByClassName("listItem");
var i;

// adds close button on each li
for (i = 0; i < myTodoList.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.classList.add("listItem");
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

// add checked symbol when li clicked
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

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
    span.classList.add("listItem");
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
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

// add login event
btnLogin.addEventListener('click', e=> {
    //get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

// Add signup event
btnSignUp.addEventListener('click', e=> {
    //get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

// logout when logout clicked (temporarily on login page for testing)
btnLogout.addEventListener('click', e=> {
    firebase.auth().signOut();
});

// Add a realtime Listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
    } else {
        console.log('not logged in');
        btnLogout.classList.add('hide');
    }
});
/*End Section -- Firebase Auth*/

