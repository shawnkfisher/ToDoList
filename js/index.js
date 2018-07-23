"use strict";
function initialize() {
    showSignIn();
}

// shows sign in page of the app to the user
function showSignIn() {
        document.getElementById('init').click();
}

// for changing tabs
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