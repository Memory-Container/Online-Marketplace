let header = document.querySelector("header")
let footer = document.querySelector("footer")
function createHeader() {
    let user = JSON.parse(localStorage.getItem("activeUser"))
    let signInArea = () => {
        if (!user) {
            return `<a class="account-link" href="../../../pages/login/" data-page="login">Sign in</a>`
        } else {
            return `
            <div class="pos-relative">
                <div class="icon input-user clickable" style="--width: 24px; position: relative;" id="userIcon">
                </div>
                <div class="pos-absolute bg-white border-radius-2 border-1 p-2 d-flex flex-col gap-2 d-none" id="userSection">
                    <div class="fb fs-1">Welcome ${user.username}</div>
                    <button class="btn btn-warning-outline" onclick="logOut()">
                        Log out
                    </button>
                </div>
            </div>
            `
        }
    }
    header.className = "site-header"
    header.innerHTML = `
        <a class="brand" href="/homepage/">NIGHT<span>.</span></a>
        <nav aria-label="Main navigation">
            <a class="" href="../../../pages/homepage/" data-page="homepage">Home</a>
            <a class=""href="../../../pages/product/" data-page="product">Products</a>
        </nav>
        <div class="header-actions">
            <a class="cart-link" href="../../../pages/cart/" aria-label="Shopping cart">
                <span class="d-flex flex-row gap-2 align-items-center">
                    <div class="icon black cart"></div>
                    Cart
                </span>
            </a>
            ${signInArea()}
        </div>
    `
    let navLinks = header.querySelectorAll("nav a")
    let currentPage = window.location.pathname.split("/").filter(Boolean).pop()
    let count = document.getElementById("cartCount")
    navLinks.forEach(link => {
        if (link.dataset.page === currentPage) {
            link.classList.add("active")
            link.href = "javascript:void(0)"
        } else {
            link.classList.remove("active")
        }
    })
    if (user) {
        console.log(user)
        let userIcon = document.getElementById("userIcon")
        let userSection = document.getElementById("userSection")
        userIcon.addEventListener("click", (e) => {
            if (userSection.classList.contains("d-none")) {
                userSection.classList.remove("d-none")
            }
        })
        window.addEventListener("click", (e) => {
            if (e.target != userIcon && !userSection.contains(e.target)) {
                if (!userSection.classList.contains("d-none")) {
                    userSection.classList.add("d-none")
                }
            }
        })
    }
    
}
function createFooter() {
    footer.className ="site-footer d-flex flex-col gap-2 align-items-start"
    footer.innerHTML = `
        <div class="page-width footer-content gap-2 flex-wrap">
            <div>            
                <a class="brand" href="../../../pages/homepage/">NIGHT<span>.</span></a>
                <p>Tools for a more considered digital life.</p>
                <p>© 2026 Night Technology</p>
            </div>
            <div class="d-flex flex-col gap-1">
                <div class="brand">Pages</div>
                <nav aria-label="Footer navigation">
                    <a class="text-white" href="../../../pages/homepage/">Home</a>
                    <a class="text-white" href="../../../pages/product/">Products</a>
                </nav>
            </div>
            <div class="d-flex flex-col gap-2">
                <div class="brand">Contact</div>
                <nav class="d-flex flex-col gap-2">
                    <p>Hotline: 1-800-NIGHT</p>
                    <p>Email: info@nighttechnology.com</p>
                </nav>
            </div>
        </div>
    `
}
createHeader()
createFooter()
function logOut() {
    localStorage.clear()
    window.location.replace("../../pages/login/")
}