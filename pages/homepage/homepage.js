let popularID = ["IOo2itatfs", "LgrY7pptvs", "OHTh1abtda", "UpwTh7Btus"];
const grid = document.getElementById("productGrid");
const heroSlides = [
    { category: "Mechanical keyboard", name: "Aura 75", price: 89, imageURL: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1100&q=90", alt: "Mechanical keyboard on a modern desk" },
    { category: "Wireless mouse", name: "Flux Mouse", price: 49, imageURL: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1100&q=90", alt: "Wireless mouse on a desk" },
    { category: "Studio audio", name: "Pulse Headphones", price: 129, imageURL: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1100&q=90", alt: "Studio headphones" },
];
let activeHeroSlide = 0;
let heroTimer;

function renderHeroSlide() {
    const slide = heroSlides[activeHeroSlide];
    const card = document.querySelector(".hero-card");
    card.classList.add("is-changing");
    window.setTimeout(() => {
        document.getElementById("heroIndex").textContent = `Featured / ${String(activeHeroSlide + 1).padStart(2, "0")}`;
        document.getElementById("heroImage").src = slide.imageURL;
        document.getElementById("heroImage").alt = slide.alt;
        document.getElementById("heroCategory").textContent = slide.category;
        document.getElementById("heroName").textContent = slide.name;
        document.getElementById("heroPrice").textContent = `$${slide.price.toFixed(2)}`;
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

async function renderProducts() {
    let products = await getProductsList();
    products = products.filter(product => popularID.includes(product.id));
    grid.innerHTML = products.map((product) => `
        <div class="product-card">
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
        </div>`).join("");

    grid.querySelectorAll(".add-button").forEach((button) => {
        button.addEventListener("click", () => addToCart(button.dataset.id, button));
    });
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
initializeHeroCarousel();
