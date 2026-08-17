const productDetail = document.querySelector("#product");
let product = null;
async function initializeProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    if (productId) {
        product = await getProduct(productId);
        renderProductDetail(product);
    } else {
        location.href = "/pages/product/";
    }   
}
async function renderProductDetail(product) {
    if (!productDetail) return;
    if (!product) {
        productDetail.innerHTML = `
            <div class="d-flex flex-column align-items-center justify-content-center" style="height: 300px;">
                <h3 class="text-muted">Product not found</h3>
                <button class="btn btn-primary mt-3" onclick="window.location.href='/pages/product/'">Back to Products</button>
            </div>
        `;
        return;
    }
    productDetail.innerHTML = `
        <section class="d-flex flex-row flex-wrap justify-content-center p-3 gap-3 border-radius-3 bg-white shadow">
            <div class="productImage shadow">
                <img id="productImage" src="${product.imageURL}">
            </div>
            <div class="productDetails d-flex flex-col gap-2 align-items-start">
                <div class="text-black fb fs-5" id="productName">${product.name}</div>
                <div class="text-black fs-1 fb">Category: <span id="productCategory" class="text-muted">${product.category}</span></div>
                <div class="text-black fs-2 fb">
                    <span>Price: </span> <span class="text-primary fs-3"  id="productPrice">$${product.price.toFixed(2)}</span>
                </div>
                <div class="d-flex flex-row align-items-center gap-2">
                    <label for="quantity" class="w-fit fs-2 fb">Quantity:</label>
                    <input type="number" id="quantityInput" name="quantity" value="1" min="1" class="border-1 border-muted border-radius-1 py-1 px-2 w-50">
                </div>
                <div id="addToCart">
                    <button class="btn btn-primary">Add to cart</button>
                </div>
                <div class="d-flex gap-1 flex-col">
                    <div class="fs-2 fb">Item Description</div>
                    <div class="text-black w-100 fs-2" id="productDescription">${product.description}</div>
                </div>
            </div>
        </section>
    `;

    const addToCartBtn = productDetail.querySelector("#addToCart button");
    const quantityInput = productDetail.querySelector("#quantityInput");
    addToCartBtn.addEventListener("click", () => {
        const productInfo = {
            id: addToCartBtn.getAttribute("data-id"),
            quantity: parseInt(quantityInput.value) < 0 ? 1 : parseInt(quantityInput.value) || 1,
        };
        console.log(1)
        addToCart(product.id, addToCartBtn, productInfo.quantity)
    });
}
initializeProductDetail()