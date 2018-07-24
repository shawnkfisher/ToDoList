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
var db = firebase.storage();

$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});

$("ul").on("click", "span", function(event){

    // the 1st "this" refers the span
    $(this).parent().fadeOut(500, function(){
        // the 2nd "this" refers to the li that is fading out
        $(this).remove();
    });
    event.stopPropagation(); //this prevents bubbling
});

$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        var todoText = $(this).val(); // retrieves value from input


        $(this).val(""); // clears input

        // this is a database
        var todoRef = db.push({
            description: todoText
        });
        var key = todoRef = db.push({
            description: todoText
        });


        // creates new li in ul
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
    }
});

$(".fa-chevron-circle-down").click(function(){
    $("input[type='text']").fadeToggle();
});
/*End Section -- add new item to list*/


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

