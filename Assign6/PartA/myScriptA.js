
var form = document.getElementById("form1");

// If form exists, add an event listener on the submit button that calls submitted()
if (form) {
    form.addEventListener("submit", submitted)
} else { alert("Form unreadable") }

// Initialising boolean checks for each input form element
var uNameVal = false;
var emailIdVal = false;
var passVal = false;

/* Just a regex for self understanding
^                                            Match the beginning of the string
(?=.*[0-9])                                  Require that at least one digit appear anywhere in the string
(?=.*[a-z])                                  Require that at least one lowercase letter appear anywhere in the string
(?=.*[A-Z])                                  Require that at least one uppercase letter appear anywhere in the string
(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\])    Require that at least one special character appear anywhere in the string
.{8,32}                                      The password must be at least 8 characters long, but no more than 32
$                                            Match the end of the string.
*/

// Initializing regEx for each of those inputs
// Any alphabetic string of max length 16
var regExUName = /^[a-zA-Z]{7,15}$/;
// anystring@northeastern.edu
var regExEmailId = /^[A-Za-z0-9._%+-]+@northeastern\.edu$/;
// Min 8 max 16 chars alphanumeric. Adding a . after the expression before length contraint would allow all characters including special.
// Atleast one number, atleast one alphabet, total alphanumeric string of length 8-16(?=.*\d.*)(?=.*[a-zA-Z].*)[0-9A-Za-z]+
var regExPass = /^(?=.*\d.*)(?=.*[a-zA-Z].*)[a-zA-Z0-9]{8,16}$/;

var uName = document.getElementById("uName");
uName.addEventListener("input", validate);

var emailId = document.getElementById("emailId");
emailId.addEventListener("input", validate);

var pass = document.getElementById("pass");
pass.addEventListener("input", validate);


function validate(e) {
    var value = e.target.value;
    var elemId = this.id;
    var errMsg = elemId + "Err";

    switch (elemId) {
        case "uName":
            if(!value.trim().match(regExUName)){
                document.getElementById(errMsg).style.display = "block";
                uNameVal = false;
            } else {
                console.log("entered user name");
                document.getElementById(errMsg).style.display = "none";
                uNameVal = true;
            } break;
        case "emailId":
            if(!value.trim().match(regExEmailId)){
                document.getElementById(errMsg).style.display = "block";
                emailIdVal = false;
            } else {
                console.log("entered email");
                document.getElementById(errMsg).style.display = "none";
                emailIdVal = true;
            } break;
        case "pass":
            if(!value.trim().match(regExPass)){
                document.getElementById(errMsg).style.display = "block";
                passVal = false;
            } else {
                console.log("entered user name");
                document.getElementById(errMsg).style.display = "none";
                passVal = true;
            } break;
    }
}

// Function to check form on submission
function submitted(e) {
    e.preventDefault();
    if (uNameVal && emailIdVal && passVal) {
        alert("Form has been submitted succesfully")

        var usrName = $("#uName").val();
        window.sessionStorage.setItem("username", usrName);
        // Opening the calculator in same page on successful login
        window.open('./calculator.html', '_self');
    }
    else {
        alert("Submission failed. Please ensure all fields are filled!");
    }
}