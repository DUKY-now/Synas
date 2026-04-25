function resetUI() {
    document.querySelectorAll(".dropdown.active")
        .forEach(el => el.classList.remove("active"));
}

document.addEventListener("DOMContentLoaded", () => {
    // Include HTML components
    document.querySelectorAll("[data-include]").forEach(async (el) => {
        const file = el.getAttribute("data-include");

        const res = await fetch(file);
        const html = await res.text();
        el.innerHTML = html;

        // important : attendre DOM injecté
        requestAnimationFrame(() => {
            if (file.includes("navbar")) {
                setupDropdownMenu();
            }
        });
    });

    setupSlider(); // safe init
});


// ============================
// DROPDOWN
// ============================
function setupDropdownMenu() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector(".dropdown-toggle");

        if (!toggle) return;

        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            // toggle uniquement ce dropdown
            dropdown.classList.toggle("active");
        });
    });

    // clic extérieur → ferme tout
    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown.active")
            .forEach(d => d.classList.remove("active"));
    });
}


// ============================
// SLIDER SAFE
// ============================
function setupSlider() {
    const slider = document.getElementById("slider");
    const leftBtn = document.querySelector(".left");
    const rightBtn = document.querySelector(".right");

    if (!slider || !leftBtn || !rightBtn) return;

    leftBtn.addEventListener("click", () => {
        slider.scrollBy({ left: -300, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
        slider.scrollBy({ left: 300, behavior: "smooth" });
    });
}