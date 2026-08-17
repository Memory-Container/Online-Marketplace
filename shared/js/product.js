
async function getProductsList() {
    try {
        let response = await fetch(`${apiLink}/products`)
        if (!response.ok) {
            throw new Error("Failed to get product list")
        }
        response = await response.json()
        return response;
        
    }
    catch(e) {
        console.error(e)
    }
}
async function getProduct(id) {
    try {
        let response = await fetch(`${apiLink}/products/${id}`)
        if (!response.ok) {
            throw new Error("Failed to get product")
        }
        response = await response.json()
        console.log(response)
        return response
    }
    catch(e) {
        console.error(e)
    }
}
async function createProduct(productData) {
    if (!productData) return;
    try {
        let response = await fetch(`${apiLink}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        })
        if (!response.ok) {
            throw new Error("Failed to create product")
        }
        response = await response.json()
        console.log(response)
        return response
    }
    catch(e) {
        console.error(e)
    }
}
async function deleteProduct(id) {
    console.log(id)
    if (!id) return;
    try {
        let response = await fetch(`${apiLink}/products/${id}`, {
            method: "DELETE",
        })
        if (!response.ok) {
            throw new Error("Failed to create product")
        }
        response = await response.json()
        console.log(response)
        return response
    }
    catch(e) {
        console.error(e)
    }
}
function filterProductByType(list, type) {
    if (type == "All") {
        return list
    }
    return list.filter(element => element.category === type);
}
function sortProductBy(type, order, list) {
    if (order === "ascending") {
        switch(type) {
            case name: 
                return list.toSorted((a, b) => a.name.localeCompare(b.name));
        }
    }
}
async function openEditModal(id) {
    let productData = await getProduct(id)
}