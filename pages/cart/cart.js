let listProductState = {
    allProduct: [],
    product: [],
    searchTerm: "",
    filterType: "All",
    totalCartPrice: 0,
}
listProductState.allProduct =  localStorage.getItem("nightCart") ? JSON.parse(localStorage.getItem("nightCart")) : []
listProductState.product = listProductState.allProduct;
function renderProductTable(products) {
    const tableBody = document.querySelector("#cartTable");
    const totalCartPriceElement = document.getElementById("totalCartPrice");
    if (!products || products.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6' class='text-center'>No item to show here</td></tr>";
        listProductState.totalCartPrice = 0;
        updateTotalCartPrice(0);
        return;
    }
    listProductState.totalCartPrice = 0;
    tableBody.innerHTML = "";
    for(element of products) {
        renderProductRow(element);
    }
}
function renderProductRow(products) {
    const tableBody = document.querySelector("#cartTable");
    const totalCartPriceElement = document.getElementById("totalCartPrice");
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${products?.name}</td>
        <td>${products?.category}</td>
        <td>$${products?.price}</td>
        <td>${products?.quantity}</td>
        <td>$${(products?.price * products?.quantity).toFixed(2)}</td>
        <td class="justify-items-center"><button class="btn btn-sm btn-warning-outline removeItemBtn align-self-center" data-id="${products?.id}">Remove</button></td>
    `;
    tableBody.appendChild(row);
    listProductState.totalCartPrice += products?.price * products?.quantity;
    updateTotalCartPrice(listProductState.totalCartPrice);
    const removeItemBtn = row.querySelector(".removeItemBtn");
    removeItemBtn.addEventListener("click", () => {
        showDeleteModal(products)
    });
}
function updateTotalCartPrice(price) {
    const totalCartPriceElement = document.getElementById("totalCartPrice");
    totalCartPriceElement.textContent = `$${price.toFixed(2)}`;
}
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("nightCart")) || [];
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("nightCart", JSON.stringify(cart));
    listProductState.allProduct = cart;
    listProductState.product = cart;
    filterProducts();
    renderProductTable(listProductState.product);
}
function clearCart() {
    localStorage.removeItem("nightCart");
    listProductState.allProduct = [];
    listProductState.product = [];
    updateTotalCartPrice(0);
    renderProductTable();
}
function initializeFilter() {
    let filter = document.querySelector("#filter").querySelectorAll(".btn")
    let searchInput = document.querySelector("#searchInput")
    filter.forEach(element => {
        if (element.id === "delete") {
            element.addEventListener("click", showClearCartModal)
            return;
        }
        element.addEventListener("click", () => {
            filter.forEach(element2 => {
                if (element2.id === "delete") {
                    return;
                }
                element2.className = "btn btn-sm btn-dark-outline"
            });
            element.className = "btn btn-sm btn-dark"
            listProductState.filterType = element.textContent;
            filterProducts();
            renderProductTable(listProductState.product);
        })
    })
    searchInput.addEventListener("input", () => {
        filterProducts();
        renderProductTable(listProductState.product);
    })
}
function filterProducts() {
    listProductState.searchTerm = searchInput.value.toLowerCase();
    listProductState.product = listProductState.allProduct.filter(product => 
            (product.category === listProductState.filterType || listProductState.filterType === "All") && product.name.toLowerCase().includes(listProductState.searchTerm)
    );
}
renderProductTable(listProductState.product);
initializeFilter();
function showDeleteModal(product) {
    createModal({
    title: `Delete Confirmation`,
    content: `Are you sure you want to delete ${product?.name} from your cart?`,
    options: 
    [{
        class: 'btn btn-secondary-outline',
        text: 'Cancel',
        action: function () {
            closeModal()
        }
    },
    {
        class: 'btn btn-warning',
        text: 'Confirm',
        action: function () {
            removeFromCart(product?.id)
            closeModal()
        }
    }],
    isForm: false
})
}
function showClearCartModal() {
    if (listProductState.allProduct.length == 0) {
        createModal({
            title: `Nothing to clear`,
            content: `You don't have any item to clear`,
            options: 
            [
            {
                class: 'btn btn-primary',
                text: 'OK',
                action: function () {
                    closeModal()
                }
            }],
            isForm: false
        })
    } else {
        createModal({
        title: `Delete Confirmation`,
        content: `Are you sure you want to clear your cart?`,
        options: 
        [{
            class: 'btn btn-secondary-outline',
            text: 'Cancel',
            action: function () {
                closeModal()
            }
        },
        {
            class: 'btn btn-warning',
            text: 'Confirm',
            action: function () {
                clearCart()
                closeModal()
            }
        }],
        isForm: false
    })
    }
}