async function addToCart(id, button = null, quantity = 1) {
    let user = localStorage.getItem("activeUser");
    if (!user) {
        alert("Please log in to add items to your cart.");
        return;
    }
    const product = await getProduct(id);
    if (!product) return;
    const cart = getCart();
    const existing = cart.find((item) => item.id === id);
    if (existing) existing.quantity += quantity;
    else cart.push({ ...product, quantity: quantity });
    localStorage.setItem("nightCart", JSON.stringify(cart));
    button.innerHTML = `Added <div class="icon icon-sm check" style="background-color: white"></div>`;
    button.disabled = true;
    alert(`Product "${product.name}" added to cart!`);
    window.setTimeout(() => { button.textContent = "Add to cart"; button.disabled = false; }, 1100);
}
function getCart() {
    return JSON.parse(localStorage.getItem("nightCart")) || [];
}