let userList
let emailInput = document.querySelector("#email")
let emailError = document.querySelector("#email-error")
let passwordError = document.querySelector("#password-error")
let formError = document.querySelector("#form-error")
let passwordInput = document.querySelector("#password")
let form = document.querySelector("#loginForm")
let errorText = document.querySelector(".error")
emailInput.addEventListener("blur", () => {
    updateError("#email-error", checkGmailError(emailInput.value))
})
passwordInput.addEventListener("blur", () => {
    updateError("#password-error", checkPasswordError(passwordInput.value))
})
async function initializeUserList() {
    userList = await getUsersList()
    console.log(userList)
}
initializeUserList()
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let isCredentialCorrect = await checkUserCrential(emailInput.value, passwordInput.value)
    if (!isCredentialCorrect) {
        updateError("#form-error", "Email or Password is not correct")
    } else {
        localStorage.setItem("activeUser", JSON.stringify(userList.find(user => user.email === emailInput.value)))
        location.replace("/pages/homepage/")
    }
})
function updateError(element, error) {
    document.querySelector(element).textContent = error
}
function checkGmailError(value) {
    if (value.length == 0) {
        return "Email field cannot be empty"
    }
    if (!/^\S+@\S+\.\S+$/.test(value)) {
        return "Not a valid email"
    }
    return ""
}
function checkPasswordError(value) {
    if (value.length == 0) {
        return "Password field cannot be empty"
    }
    return ""
}
