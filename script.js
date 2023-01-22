const passLengthSlider = document.querySelector(".password-length input");
const generatePassButton = document.querySelector(".btn-generate");
const options = document.querySelectorAll(".option input");
const myPassword = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".password-indicator");
const copyIcon = document.querySelector(".copy-icon");


// object of letters, number & symbol
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!@#$%&<>(){}[]-~_:;.,|*-+"
}


// generate password
const generatePassword = () => {
    let staticPassword = "";
    let randomPassword = "";
    let excludeDuplicate = false;
    let passwordLength = passLengthSlider.value;


    // looping through checkbox of each option
    options.forEach((option) => {
        if (option.checked) {  // condition for checked checkbox
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                // passing id as a key in character object and than adding value of that key in staticPassword
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") { // condition for if chechbox id is spaces
                staticPassword += `   ${staticPassword}  `; // adding spaces in staticPassword
            } else { // condition for exclude duplicate
                excludeDuplicate = true;
            }
        }
    });


    // Math.random() choose randomly from staticPassword 
    for (let i = 0; i < passwordLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) { // condition if excludeDuplicate is true
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else { // condition for adding random character(duplicate, etc) to randomPassword 
            randomPassword += randomChar;
        }
    }

    myPassword.value = randomPassword;  // passing randomPassword to myPassword
}


// password strength indicator function 
const updatePassIndicator = () => {
    passIndicator.id = passLengthSlider.value <= 8 ? "weak" : passLengthSlider.value <= 16 ? "medium" : "strong";
}


// update password length slider function
const updatePassLengthSlider = () => {
    document.querySelector(".password-length span").innerText = passLengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

updatePassLengthSlider();


const copyPassword = () => {
    navigator.clipboard.writeText(myPassword.value); // writes the specified text string to the system clipboard
    // changin copy icon to check icon
    copyIcon.innerHTML = `<i class="fa-solid fa-check"></i>`;
    // changing back check icon to copy icon
    setTimeout(() => {
        copyIcon.innerHTML = `<i class="fa-regular fa-copy"></i>`;
    }, 1500)
}


passLengthSlider.addEventListener("input", updatePassLengthSlider);
generatePassButton.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);