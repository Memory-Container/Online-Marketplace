const products = [
    { id: "aura-75", name: "Aura 75 Keyboard", price: 89, category: "Keyboard", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85" },
    { id: "flux-mouse", name: "Flux Wireless Mouse", price: 49, category: "Mouse", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85" },
    { id: "pulse-headphones", name: "Pulse Studio Headphones", price: 129, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85" },
    { id: "halo-light", name: "Halo Desk Light", price: 39, category: "Accessories", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=85" },
];

const grid = document.getElementById("productGrid");
const count = document.getElementById("cartCount");
const heroSlides = [
    { category: "Mechanical keyboard", name: "Aura 75", price: 89, note: "Designed for<br><strong>deep focus.</strong>", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1100&q=90", alt: "Mechanical keyboard on a modern desk" },
    { category: "Wireless mouse", name: "Flux Mouse", price: 49, note: "Made for<br><strong>smooth movement.</strong>", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1100&q=90", alt: "Wireless mouse on a desk" },
    { category: "Studio audio", name: "Pulse Headphones", price: 129, note: "Hear every<br><strong>bright detail.</strong>", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1100&q=90", alt: "Studio headphones" },
];
let activeHeroSlide = 0;
let heroTimer;

function getCart() { return JSON.parse(localStorage.getItem("nightCart") || "[]"); }
function updateCartCount() { count.textContent = getCart().reduce((total, item) => total + item.quantity, 0); }

function renderHeroSlide() {
    const slide = heroSlides[activeHeroSlide];
    const card = document.querySelector(".hero-card");
    card.classList.add("is-changing");
    window.setTimeout(() => {
        document.getElementById("heroIndex").textContent = `Featured / ${String(activeHeroSlide + 1).padStart(2, "0")}`;
        document.getElementById("heroImage").src = slide.image;
        document.getElementById("heroImage").alt = slide.alt;
        document.getElementById("heroCategory").textContent = slide.category;
        document.getElementById("heroName").textContent = slide.name;
        document.getElementById("heroPrice").textContent = `$${slide.price.toFixed(2)}`;
        document.getElementById("heroNote").innerHTML = slide.note;
        document.querySelectorAll(".carousel-dot").forEach((dot, index) => dot.classList.toggle("active", index === activeHeroSlide));
        card.classList.remove("is-changing");
    }, 180);
}

function goToHeroSlide(index) {
    activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
    renderHeroSlide();
    window.clearInterval(heroTimer);
    heroTimer = window.setInterval(() => goToHeroSlide(activeHeroSlide + 1), 5000);
}

function initializeHeroCarousel() {
    const dots = document.getElementById("carouselDots");
    heroSlides.forEach((slide, index) => {
        const dot = document.createElement("button");
        dot.className = "carousel-dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Show ${slide.name}`);
        dot.addEventListener("click", () => goToHeroSlide(index));
        dots.appendChild(dot);
    });
    document.getElementById("previousSlide").addEventListener("click", () => goToHeroSlide(activeHeroSlide - 1));
    document.getElementById("nextSlide").addEventListener("click", () => goToHeroSlide(activeHeroSlide + 1));
    renderHeroSlide();
    heroTimer = window.setInterval(() => goToHeroSlide(activeHeroSlide + 1), 5000);
}

function renderProducts() {
    grid.innerHTML = products.map((product) => `
        <article class="product-card">
            <a class="product-image" href="../productDetails/index.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
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

function addToCart(id, button) {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    const cart = getCart();
    const existing = cart.find((item) => item.id === id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("nightCart", JSON.stringify(cart));
    updateCartCount();
    button.textContent = "Added ✓";
    button.disabled = true;
    window.setTimeout(() => { button.textContent = "Add to cart"; button.disabled = false; }, 1100);
}

document.getElementById("newsletterForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email");
    const message = document.getElementById("formMessage");
    if (!email.checkValidity()) { message.textContent = "Enter a valid email address."; return; }
    localStorage.setItem("nightNewsletterEmail", email.value.trim());
    message.textContent = "You are on the list — welcome.";
    event.currentTarget.reset();
});

renderProducts();
updateCartCount();
initializeHeroCarousel();
