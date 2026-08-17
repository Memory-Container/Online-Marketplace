let productList
async function initializeProductList() {
    productList = await getProductsList()
}
async function initializeProductSection() {
    let product = await getProductsList()
    renderProduct(product);
}
function renderProduct(products) {
    let grid = document.querySelector("#productGrid")
    console.log(products)
    grid.innerHTML = ""
    if (products.length === 0) {
        grid.innerHTML = `
            <div class="text-center w-100 col-12">
                <p>No products with your query found.</p>
            </div>
        `;
    } else {
        grid.innerHTML = products.map((product) => `
        <article class="product-card">
            <a class="product-image" href="../productDetails/index.html?id=${product.id}">
                <img src="${product.imageURL}" alt="${product.name}">
            </a>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-bottom">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-button" type="button" data-id="${product.id}">Add to cart</button>
                </div>
            </div>
        </article>`).join("");
        grid.querySelectorAll(".add-button").forEach((button) => {
            button.addEventListener("click", () => addToCart(button.dataset.id, button));
        });
    }
}
function initializeFilter() {
    let filterButton = document.querySelectorAll("#filter .btn")
    filterButton.forEach(element => 
        element.addEventListener("click", async () => {
            let category = element.textContent
            let filteredProducts = filterProductByType(productList, category)
            renderProduct(filteredProducts)
            filterButton.forEach(btn => {
                btn.className = "btn btn-sm btn-dark"
                if (btn.textContent != category) {
                    btn.className = "btn btn-sm btn-dark-outline"
                }
            })
        })
    )
    let searchInput = document.querySelector("#searchInput")
    searchInput.addEventListener("input", () => {
        let searchTerm = searchInput.value.toLowerCase()
        let newProductList = productList.filter(product => product.name.toLowerCase().includes(searchTerm))
        renderProduct(newProductList)
    })
}
initializeProductList()
initializeProductSection()
// initializeUserArea()
initializeFilter()