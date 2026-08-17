let emailInput = document.querySelector("#email")
let emailError = document.querySelector("#email-error")
let passwordError = document.querySelector("#password-error")
let usernameInput = document.querySelector("#username")
let usernameError = document.querySelector("#username-error")
let formError = document.querySelector("#form-error")
let passwordInput = document.querySelector("#password")
let form = document.querySelector("#signForm")
let errorText = document.querySelector(".error")
emailInput.addEventListener("blur", () => {
    updateError("#email-error", checkGmailError(emailInput.value))
})
passwordInput.addEventListener("blur", () => {
    updateError("#password-error", checkPasswordError(passwordInput.value))
})
usernameInput.addEventListener("blur", () => {
    updateError("#username-error", checkUsernameError(usernameInput.value))
})
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    if (!checkGmailError(emailInput.value) && !checkPasswordError(passwordInput.value) && !checkUsernameError(usernameInput.value)) {
        let newUser = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            type: "user"
        }
        createUser(newUser)
        localStorage.setItem("activeUser", JSON.stringify(newUser))
        location.replace("/pages/homepage")
    }
})
function updateError(element, error) {
    document.querySelector(element).textContent = error
}
function checkUsernameError(value) {
    if (value.replace(" ", '').length == 0) {
        return "Invalid username"
    }
    if (includesSpecialCharacter(value)) {
        return "Username cannot contain special characters"
    }
    if (value.length >= 20) {
        return "Username cannot have more than 20 characters"
    }
    if (value.length < 3) {
        return "Username is too short (Must be 3 characters or more)"
    }
    return ""
}
function checkGmailError(value) {
    if (value.includes(" ")) {
        return "Email cannot contain spaces"
    }
    if (value.length == 0) {
        return "Email field cannot be empty"
    }
    if (!/^\S+@\S+\.\S+$/.test(value)) {
        return "Invalid email"
    }
    return ""
}
function checkPasswordError(value) {
    if (value.includes(" ")) {
        return "Password cannot contain spaces"
    }
    if (value.length == 0) {
        return "Password field cannot be empty"
    }
    if (value.length < 8) {
        return "Password is too short (Must be 8 characters or more)"
    }
    if (value.length >= 20) {
        return "Password cannot have more than 20 characters"
    }
    return ""
}

function includesSpecialCharacter(value) {
    return /[^A-Za-z 0-9]/g.test(value)
}