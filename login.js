
     document.addEventListener("DOMContentLoaded", function() {
        const emailInput = document.querySelector('.form.login input[type="text"]');
        const passwordInput = document.querySelector('.form.login input[type="password"]');
        

        
        const loginButton = document.getElementById("loginButton");

        // Add click event listener to the login button
        loginButton.addEventListener("click", function() {
            // Check if email and password fields are not empty
            if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
                // If either field is empty, show an alert message
                alert("Please enter both email and password.");
            } else if (!emailInput.value.includes("@")) {
                // If email does not contain '@', show an alert message
                alert("Please enter a valid email address.");
            } else {
                // If both fields are filled and email contains '@', proceed to homepage
                window.location.href = "index.html";
            }
        });
    });


   
    document.addEventListener("DOMContentLoaded", function() {
        // Get references to the name, email, password, and password confirmation input fields
        const nameInput = document.querySelector('.form.signup input[type="text"]');
        const emailInput = document.querySelectorAll('.form.signup input[type="text"]')[1];
        const passwordInput = document.querySelectorAll('.form.signup input[type="password"]')[0];
        const confirmPasswordInput = document.querySelectorAll('.form.signup input[type="password"]')[1];

        const signupButton = document.getElementById("signupButton");

        // Add click event listener to the signup button
        signupButton.addEventListener("click", function() {
            if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || passwordInput.value.trim() === "" || confirmPasswordInput.value.trim() === "") {
                alert("Please fill in all fields.");
            } else if (!emailInput.value.includes("@")) {
                alert("Please enter a valid email address.");
            } else if (passwordInput.value !== confirmPasswordInput.value) {
                alert("Passwords do not match.");
            } else {
               window.location.href = "index.html";
            }
        });
    });

const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

    //to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    //appear signup and login form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });