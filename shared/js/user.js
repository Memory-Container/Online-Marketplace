let apiLink = "http://localhost:3000"
async function getUsersList() {
    try {
        let response = await fetch(`${apiLink}/users`)
        if (!response.ok) {
            throw new Error("Failed to get user list")
        }
        response = await response.json()
        return response;
        
    }
    catch(e) {
        console.error(e)
    }
}
async function getUser(id) {
    try {
        let response = await fetch(`${apiLink}/users/${id}`)
        if (!response.ok) {
            throw new Error("Failed to get User")
        }
        response = await response.json()
        console.log(response)
        return response
    }
    catch(e) {
        console.error(e)
    }
}
async function createUser(userData) {
    try {
        let response = await fetch(`${apiLink}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if (!response.ok) {
            throw new Error("Failed to create user")
        }
        response = await response.json()
        console.log(response)
        return response
    }
    catch(e) {
        console.error(e)
    }
}
async function deleteUser(id) {
    try {
        let response = await fetch(`${apiLink}/users/${id}`, {
            method: "DELETE",
        })
        if (!response.ok) {
            throw new Error("Failed to delete User")
        }
        response = await response.json()
        console.log(response)
        return response
    }
    catch(e) {
        console.error(e)
    }
}
async function checkUserCrential(email, password) {
    let userList = await getUsersList()
    for (user of userList) {
        console.log(user)
        if (user.email === email && user.password === password) {
            return true
        }
    }
    return false
}